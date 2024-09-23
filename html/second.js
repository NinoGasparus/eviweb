
function login() {
    console.log("Login function called");

    let user = {
        uname: document.getElementById("uname").value,
        password: document.getElementById("password").value
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
        navbar();
        console.log(data);
        document.getElementById("username").innerText = user.uname;
        document.getElementById("username-display").style.display = "block";
        document.getElementById("login-content").style.display = "none";

        document.getElementById("logout").style.display = "block";

        if (data.role === "admin") {
            document.getElementById("admin-panel").style.display = "block";
        } else if (data.role === "ucitelj") {
            document.getElementById("teacher-panel").style.display = "block";
        } else if (data.role === "dijak") {
            document.getElementById("student-panel").style.display = "block";
        }
        
        document.getElementById("loginError").innerText = ""; 
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

function navbar() {
    let user = {
       token: getCookie("token")
    };
    console.log(token);
    console.log(IP);
    fetch(IP + "login", {
       
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
    .then((response) => {
        if (response.ok) {
 		document.getElementById("username").innerText = user.uname;
        	document.getElementById("username-display").style.display = "block";
        	document.getElementById("login-content").style.display = "none";
		return response.json();
	} else {
            document.getElementById("loginError").innerText = "Login failed";
            document.getElementById("loginError").style.color = "#ff0000";
            throw new Error('Login failed');
        }
    }).then((data) =>{
	console.log(data);

    }).catch((error) => {
        console.error('Login error:', error);
    });
}

