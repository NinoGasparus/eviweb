function login() {
    let user = {
        uname: document.getElementById("uname").value,
        password: document.getElementById("password").value
    };
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
	setCookie('token', data, 3600);
	showSidebar(data);
    }).catch((error) => {
        console.error('Login error:', error);
    });
}


function showSidebar(token) {
    let user = {
        uname: document.getElementById("uname").value,
        password: document.getElementById("password").value
    };
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

