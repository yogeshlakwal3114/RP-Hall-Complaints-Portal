const express = require('express');
const router = express.Router();
const studentController = require('../controller/userController');

// Route to add a new student
router.post('/sign', studentController.addStudent);

// Route to add a new student
router.post('/login', studentController.loginStudent);

// Route to get a student by roll number
router.get('/:rollno', studentController.getStudentByRollno);

// Route to update student information by roll number
router.put('/:rollno', studentController.updateStudent);

// Route to delete a student by roll number
router.delete('/:rollno', studentController.deleteStudent);

module.exports = router;
