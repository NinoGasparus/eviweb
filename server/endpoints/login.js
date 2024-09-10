const users =  require('../index.js');

const crypt = require('crypto');

function login(req, res) {
    console.log(req.body);

    const user = users.find(u => u.uname === req.body.uname);
    if (user && user.password === req.body.password) {
	
	let token = crypt.randomBytes(256).toString('base64');
	let ip  =  req.ip;
	let lifeTime = 0;     
	let stay = req.body.stay;
	if(stay === true){
		lifeTime =  30 * 24 *  60 *  60;
	}
	
	let session = {
		"token" :  token,
		"ip" : ip,
		"lifetime" : lifeTime
	}


	user.tokens.push(session);
	res.status(200).json({"token" : token, "lifeTime" : lifeTime}).send();
    } else {
        res.status(403).send();
    }
}

module.exports = login;
