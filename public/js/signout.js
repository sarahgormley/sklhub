const logout = async() => {

    const response = await fetch('/api/users/signout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/signin');
    } else {
        logoutFailed.innerHTML = "Login Failed! Please try again";
    }
};

document
    .querySelector('#logout')
    .addEventListener('click', logout);