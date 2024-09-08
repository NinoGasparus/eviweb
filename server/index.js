const express = require('express')
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const mysql = require('mysql');
const { error, Console } = require('console');


const PORT = process.env.port || 6969;
app.listen(PORT, () => {
    console.log('Streznik tece na portu', PORT);
})


const users = [
    { uname: "admin", password: "admin", role: "admin", tokens:  [] },
    { uname: "ucitelj", password: "ucitelj", role: "ucitelj",  tokens: [] },
    { uname: "dijak", password: "dijak", role: "dijak", tokens:  [] }
]
module.exports =  users;

const login =  require("./endpoints/login.js");
app.post("/login", (req,  res) =>{
	login(req, res);
});

















