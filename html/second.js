function postData(){
    
        
        let data = {
         
        }

        fetch("http://127.0.0.1:420/add", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
    
            body: JSON.stringify(data)
        }).then((response) =>{
            if(response.ok){
                document.getElementById("insertError").style = "color: #ffffff"
            }else{
                document.getElementById("insertError").style = "color: #ff0000"
            }
        })
}




function getData(){


    fetch("http://127.0.0.1:420/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            
          } 
        
        
        })
}


function login() {
    console.log("Login function called");
    let user = {
        uname: document.getElementById("uname").value,
        password: document.getElementById("password").value

    };

    fetch(IP+ "login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).then((response) => {
        if (response.ok) {
            let loginErrorElement = document.getElementById("loginError");
            if (loginErrorElement) {
                loginErrorElement.style.color = "#ff0000";
            } else {
                console.error("Login error element not found!");
            }
            return response.json();
        } else {
            document.getElementById("loginError").innerText = "Login failed";
            document.getElementById("loginError").style.color = "#ff0000";
            throw new Error('Login failed');
        }
    }).then((data) => {
        token = {token: data.token, id: data.id};
        console.log(token);
        
        document.getElementById("username").innerText = user.uname;
        document.getElementById("username-display").style.display = "block";

        document.getElementById("login-content").style.display = "none";
    }).catch((error) => {
        console.error('Login error:', error);
    });
}