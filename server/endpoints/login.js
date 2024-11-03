const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const db = require('../db'); 

router.post('/login', (req, res) => {
    const { uname, password } = req.body;

    if (!uname || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    db.query('SELECT * FROM users WHERE uname = ?', [uname], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        const user = results[0];
        if (user) {
            if (user.password === password) {
                const token = crypto.randomBytes(64).toString('hex');
                res.status(200).json({ message: 'Login successful', token, role: user.role });
            } else {
                res.status(403).json({ error: 'Invalid credentials' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });
});

module.exports = router;
