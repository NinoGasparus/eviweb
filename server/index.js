const express = require('express')
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const mysql = require('mysql');
const { error, Console } = require('console');
   

app.listen(6969);
app.post("/login", (req,res)=>{
    console.log(req);
    if(req.body.uname == "admin" && req.body.password == "admin"){
        console.log("g");
        res.status(200).send;
    }
})















