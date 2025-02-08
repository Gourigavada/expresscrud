const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON data

// Sample student data
let students = []; 

// GET - Retrieve all students
app.get('/students', (req, res) => {
    res.json(students);
});

// POST - Add a new student
app.post('/students', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }
    
    const newStudent = { id: students.length + 1, name, email };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// PUT - Update a student
app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const foundStudent = students.find(s => s.id === studentId);

    if (!foundStudent) {
        return res.status(404).json({ message: "Student not found" });
    }

    foundStudent.name = req.body.name || foundStudent.name;
    foundStudent.email = req.body.email || foundStudent.email;

    res.json(foundStudent);
});

// DELETE - Remove a student
app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const initialLength = students.length;
    
    students = students.filter(s => s.id !== studentId);

    if (students.length === initialLength) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: 'Student deleted' });
});

app.listen(5000, () => console.log("Server is running on port 5000"));