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
        if (!response.ok) {
            document.getElementById("loginError").innerText = "Login failed";
            document.getElementById("loginError").style.color = "#ff0000";
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then((data) => {
        document.getElementById("username").innerText = user.uname;
        document.getElementById("username-display").style.display = "block";
        document.getElementById("login-content").style.display = "none";
        
        if (data.lifeTime === 0) {
            setCookie('token', data.token);
        } else {
            setCookie('token', data.token, data.lifeTime);
        }

        showAdminPanel(data.role); 
        console.log("Login successful,", data);
    })
    .catch((error) => {
        console.error('Login error:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logout');
    
    if (logoutButton) {
        logoutButton.addEventListener("click", function() {
            logoutButton.style.display = "none";
            document.getElementById("admin-panel").style.display = "none";
            document.getElementById("teacher-panel").style.display = "none";
            document.getElementById("student-panel").style.display = "none";
            document.getElementById("username-display").style.display = "none";
            document.getElementById("login-content").style.display = "block";
            document.getElementById("username").innerText = ""; 
        });
    }
});