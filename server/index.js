const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { error, Console } = require('console');
const pravice = require("./pravice.json");
const login = require("./endpoints/login.js");

const app = express();
const PORT = process.env.PORT || 6969;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       
    password: '',  
    database: 'db',   
    port: 4000  
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected!');

    // Create tables if they don't exist
    db.query(`CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        subjects TEXT NOT NULL
    )`, (err) => {
        if (err) throw err;
        console.log('Students table ready!');
    });

    db.query(`CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name TEXT NOT NULL
    )`, (err) => {
        if (err) throw err;
    });

    db.query(`CREATE TABLE IF NOT EXISTS grades (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        student_id INTEGER NOT NULL,
        subject_id INTEGER NOT NULL,
        grade INTEGER CHECK (grade >= 1 AND grade <= 5),
        date DATE NOT NULL,
        FOREIGN KEY (student_id) REFERENCES students (id),
        FOREIGN KEY (subject_id) REFERENCES subjects (id)
    )`, (err) => {
        if (err) throw err;
    });

    // Corrected users table creation
    db.query(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`, (err) => {
        if (err) throw err; // Handle error
    });
});


app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});

// Serve subpages
app.get('/subpages/:page', (req, res) => {
    const page = req.params.page;
    const options = {
        root: path.join(__dirname, 'html', 'subpages')
    };

    res.sendFile(`${page}.html`, options, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(err.status).end();
        } else {
            console.log('Sent:', page);
        }
    });
});

// Function to query subjects (as per your previous code)
function bingus(req, res) {
    db.query('SELECT * FROM test', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err });
        }
        console.log(results);
        res.status(200).json(results);
    });
}

// Get subjects
app.get('/subjects', (req, res) => {
    bingus(req, res);
});

// Login endpoint
app.post("/login", (req, res) => {
    login(req, res);
});

app.use('/api', login); 

// API to get all students
app.get('/api/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// API to add a new student
app.post('/api/students', (req, res) => {
    const { name, subjects } = req.body;

    const sql = 'INSERT INTO students (name, subjects) VALUES (?, ?)';
    db.query(sql, [name, JSON.stringify(subjects)], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ id: result.insertId, name, subjects });
    });
});

// API to delete a student
app.delete('/api/students/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM students WHERE id = ?';

    db.query(sql, [id], (err) => {
        if (err) return res.status(500).send(err.message);
        res.status(204).send();
    });
});

// Absences Endpoints
app.post('/api/absences', (req, res) => {
    const { student_id, absence_date, hour_id, description } = req.body;

    const sql = `INSERT INTO absences (student_id, absence_date, hour_id, description) VALUES (?, ?, ?, ?)`;
    db.query(sql, [student_id, absence_date, hour_id, description], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Absence added successfully', id: result.insertId });
    });
});

// Get absences by student_id
app.get('/api/absences/:student_id', (req, res) => {
    const student_id = req.params.student_id;

    const sql = `SELECT absence_date, hour_id, description FROM absences WHERE student_id = ? ORDER BY absence_date DESC`;
    db.query(sql, [student_id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
});

// Delete absence
app.delete('/api/absences/:id', (req, res) => {
    const id = req.params.id;

    const sql = `DELETE FROM absences WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Absence deleted successfully' });
    });
});

// Tests Endpoints
app.get('/api/tests', (req, res) => {
    db.query('SELECT * FROM tests', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});

// Add test
app.post('/api/tests', (req, res) => {
    const { test_date, test_subject, test_time, test_teacher } = req.body;
    const newTest = { test_date, test_subject, test_time, test_teacher };
    db.query('INSERT INTO tests SET ?', newTest, (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(201).json({ id: result.insertId, ...newTest });
    });
});

// Update test
app.put('/api/tests/:id', (req, res) => {
    const { id } = req.params;
    const { test_date, test_subject, test_time, test_teacher } = req.body;
    const updatedTest = { test_date, test_subject, test_time, test_teacher };
    db.query('UPDATE tests SET ? WHERE id = ?', [updatedTest, id], (err) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ id, ...updatedTest });
    });
});

// Delete test
app.delete('/api/tests/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tests WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(204).send();
    });
});

// Grades Endpoints
// Add grade
app.post('/api/grades', (req, res) => {
    const { studentId, subjectId, grade, date } = req.body;
    const query = `INSERT INTO grades (student_id, subject_id, grade, date) VALUES (?, ?, ?, ?)`;
    
    db.query(query, [studentId, subjectId, grade, date], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Get grades
app.get('/api/grades', (req, res) => {
    const query = `SELECT g.id, s.name AS subject, st.name AS student, g.grade, g.date FROM grades g JOIN students st ON g.student_id = st.id JOIN subjects s ON g.subject_id = s.id`;
    
    db.query(query, [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

// Delete grade
app.delete('/api/grades/:id', (req, res) => {
    const query = `DELETE FROM grades WHERE id = ?`;
    
    db.query(query, req.params.id, function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(204).end();
    });
});

// Update user profiles
app.put('/api/profile', (req, res) => {
    const { id, name, email, password } = req.body;

    if (!id || !name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const sql = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;
    db.query(sql, [name, email, password, id], (err) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json({ message: 'Profile updated successfully!' });
    });
});


// Create a new subject
app.post('/api/subjects', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Subject name is required.' });
    }
    const sql = `INSERT INTO subjects (name) VALUES (?)`;
    db.query(sql, [name], (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(201).json({ id: result.insertId, name });
    });
});

// Get all subjects
app.get('/api/subjects', (req, res) => {
    const sql = `SELECT * FROM subjects`;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(results);
    });
});

// Update a subject
app.put('/api/subjects/:id', (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    if (!name) {
        return res.status(400).json({ message: 'Subject name is required.' });
    }
    const sql = `UPDATE subjects SET name = ? WHERE id = ?`;
    db.query(sql, [name, id], (err) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json({ message: 'Subject updated successfully!' });
    });
});

// Delete a subject
app.delete('/api/subjects/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM subjects WHERE id = ?`;
    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json({ message: 'Subject deleted successfully!' });
    });
});

app.post('/api/teachers', (req, res) => {
    const { name, subjects } = req.body;
    if (!name || !subjects) {
        return res.status(400).json({ message: 'Name and subjects are required.' });
    }
    const newTeacher = { id: teachers.length + 1, name, subjects };
    teachers.push(newTeacher);
    res.status(201).json(newTeacher);
});

// Get all teachers
app.get('/api/teachers', (req, res) => {
    res.json(teachers);
});

// Update a teacher
app.put('/api/teachers/:id', (req, res) => {
    const { id } = req.params;
    const { name, subjects } = req.body;
    const teacherIndex = teachers.findIndex(t => t.id == id);
    if (teacherIndex === -1) {
        return res.status(404).json({ message: 'Teacher not found.' });
    }
    teachers[teacherIndex] = { id: Number(id), name, subjects };
    res.json(teachers[teacherIndex]);
});

// Delete a teacher
app.delete('/api/teachers/:id', (req, res) => {
    const { id } = req.params;
    const teacherIndex = teachers.findIndex(t => t.id == id);
    if (teacherIndex === -1) {
        return res.status(404).json({ message: 'Teacher not found.' });
    }
    teachers.splice(teacherIndex, 1);
    res.json({ message: 'Teacher deleted successfully!' });
});