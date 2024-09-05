const express = require('express')
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const mysql = require('mysql');
const { error, Console } = require('console');
   

const PORT = process.env.port || 6969;
app.listen(PORT, () => {
    console.log('Streznik tece na portu ${PORT}');
})


const users = [
    { uname: "admin", password: "admin", role: "admin" },
    { uname: "ucitelj", password: "ucitelj", role: "ucitelj" },
    { uname: "dijak", password: "dijak", role: "dijak" }
]

app.post("/login", (req, res) => {
    console.log(req.body);

    const user = users.find(u => u.uname === req.body.uname);
    if (user && user.password === req.body.password) {
        console.log("W");
        res.status(200).json({ message: 'Login successful', role: user.role });
    } else {
        console.log("F");
        res.status(401).send('Invalid credentials');
    }
});



















