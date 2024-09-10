function setCookie(name, value, seconds) {
	if(seconds){
	const date = new Date();
	date.setTime(date.getTime() + (seconds * 1000));
	const expires = "expires=" + date.toUTCString();
	const path = "path=/";
    	
	document.cookie = `${name}=${value}; ${expires}; ${path}; Secure; SameSite=Strict`;
	}else{
	const date = new Date();
	date.setTime(date.getTime() + (seconds * 1000));
	const expires = "expires=" + date.toUTCString();
	const path = "path=/";
    	document.cookie = `${name}=${value}; ${expires}; ${path}; Secure; SameSite=Strict`;

	}
}


function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

