const express = require('express')
const app = express();
app.use(express.json());
const mysql = require('mysql');
app.use(express.json());
const cors = require('cors');
const fs = require('fs');
app.use(cors());
const { error, Console } = require('console');
const path = require('path');
const pravice = require("./pravice.json");
const PORT = process.env.port || 6969;
const navbar =  require("./endpoints/navbar.js");
app.listen(PORT, () => {
    console.log('Streznik tece na portu', PORT);
})

const database = mysql.createConnection({
    host: 'localhost',
    port: 4000,
    user: 'root',
    password: '',
    database: 'school'
});

const users = [
    { id: 1, uname: "admin", password: "admin", role: "admin", tokens:  [] },
    { id: 2, uname: "ucitelj", password: "ucitelj", role: "ucitelj",  tokens: [] },
    { id: 3, uname: "dijak", password: "dijak", role: "dijak", tokens:  [] },
    { id: 4, uname: "stars", password: "stars", role: "starsi", tokens: []}
]

let admin = [
    1
]

let teacher_id = [
   2
]
let dijak_id = [
    3
]

let stars_id = [
   4
]


app.post('/subjects', (req, res)=>{
    navbar(req,res);

 })

//database.connect((err) =>{
  //if (err) throw err;
  //console.log('Cnnected to proxmox Vm, SQL');  
//})

const datapath = (path.join(__dirname, 'public', 'data.json'));

function bingus(req,res){

    database.query('SELECT * FROM subjects', (err,results)=>{
        if(err) return res.status(500).json({error: err});
        console.log(results); 
       
        res.status(200).json(results).send();
       
    });
}


app.get('/subjects', (req, res)=>{
   bingus(req,res);
})

module.exports =  users;

const login =  require("./endpoints/login.js");
app.post("/login", (req,  res) =>{
	login(req, res);
});


















