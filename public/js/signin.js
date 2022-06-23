
// Ensure correct or change values for email and password collection from user input
// Ensure login links to profile page once created
// Ensure correct query selectors
const loginFormHandler = async(event) => {
    event.preventDefault();
    console.log("test");

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {

        const response = await fetch('/api/users/signin', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            //Append login failed to login
            loginFailed.innerHTML = "Login Failed! Please try again";

        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

var loginFailed = document.querySelector('#login-failed');