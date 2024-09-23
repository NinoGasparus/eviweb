function login() {
    let user = {
        uname: document.getElementById("uname").value,
        password: document.getElementById("password").value,
        stay: document.getElementById("stayLoggedIn").checked
    };

    fetch(IP + "login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            document.getElementById("loginError").innerText = "Login failed";
            document.getElementById("loginError").style.color = "#ff0000";
            throw new Error('Login failed');
        }
    })
    .then((data) => {
        document.getElementById("username").innerText = user.uname;
        document.getElementById("username-display").style.display = "block";
        document.getElementById("login-content").style.display = "none";
        
        // Save token to cookies
        if (data.lifeTime === 0) {
            setCookie('token', data.token);
        } else {
            setCookie('token', data.token, data.lifeTime);
        }

        // Show the appropriate navbar and admin panel based on the role
        showNavbar(data.role);
        showAdminPanel(data.role); // Show the admin-panel for the admin role
    })
    .catch((error) => {
        console.error('Login error:', error);
    });
}
