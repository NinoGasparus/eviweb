const express = require('express')
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const mysql = require('mysql');
const { error, Console } = require('console');

const crypt = require('crypto');

const PORT = process.env.port || 6969;
app.listen(PORT, () => {
    console.log('Streznik tece na portu', PORT);
})


const users = [
    { uname: "admin", password: "admin", role: "admin", tokens:  [] },
    { uname: "ucitelj", password: "ucitelj", role: "ucitelj",  tokens: [] },
    { uname: "dijak", password: "dijak", role: "dijak", tokens:  [] }
]


app.post("/login", (req, res) => {
    console.log(req.body);

    const user = users.find(u => u.uname === req.body.uname);
    if (user && user.password === req.body.password) {
	let token = crypt.randomBytes(256).toString('base64');
	user.tokens.push(token);
	res.status(200).json(token).send();
    } else {
        res.status(403).send();
    }
});



















