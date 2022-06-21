
// Ensure correct or change values for email and password collection from user input
// Ensure login links to profile page once created
// Ensure correct query selectors
const loginFormHandler = async(event) => {
    event.preventDefault();
    console.log("test");

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {

        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            //Append login failed to login
            var loginFailed = document.createElement("p");
            loginFailed.setAttribute("id", "failed-msg");
            loginFailed.innerHTML = "Login Failed! Please try again";
            divName.append(loginFailed);
        }
    }
};

document
    .getElementById('login-form')
    .addEventListener('submit', loginFormHandler);