const express = require('express')
const app = express();
app.use(express.json());
const mysql = require('mysql');
const cors = require('cors');
const fs = require('fs');
app.use(cors());
const { error, Console } = require('console');
const path = require('path');
const pravice = require("./pravice.json");
const navbar =  require("./endpoints/navbar.js");

app.listen(6969, () => {
    console.log('Streznik tece na portu', 6969);
});



app.get('/subpages/:page', (req, res) => {
    
    const page = req.params.page;
    const options = {
        root: path.join(__dirname, 'html', 'subpages')}

    res.sendFile(`${page}.html`, options, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(err.status).end();
        } else {
            console.log('Sent:', page);
        }
    });
});

function bingus(req, res) {
    database.query('SELECT * FROM test', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err });
        }
        console.log(results);
        res.status(200).json(results);
    });
}

app.get('/subjects', (req, res) => {
    bingus(req, res);
});

const login = require("./endpoints/login.js");
app.post("/login", (req, res) => {
    login(req, res);
});

app.use('/api', login); 

app.use(express.static(path.join(__dirname, 'public')));












