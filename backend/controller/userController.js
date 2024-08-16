const Student = require('../models/User');


// Add a new student
exports.addStudent = async (req, res) => {
  const { rollno, password, department, year_of_passing, phone_no } = req.body;

  // Create a new student instance
  const student = new Student({ rollno, password, department, year_of_passing, phone_no });

  try {
    // Save the student to the database
    await student.save();
    res.status(201).send({ message: 'Student added successfully', student });
  } catch (err) {
    console.error('Error adding student:', err);
    res.status(500).send({ message: 'Error adding student', error: err.message });
  }
};

// Get student by roll number
exports.getStudentByRollno = async (req, res) => {
  const { rollno } = req.params;

  try {
    // Find the student by roll number
    const student = await Student.findOne({ rollno });
    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }

    // Send the student information back to the client
    res.status(200).send({ student });
  } catch (err) {
    console.error('Error fetching student:', err);
    res.status(500).send({ message: 'Server error', error: err.message });
  }
};

// Update student information by roll number
exports.updateStudent = async (req, res) => {
  const { rollno } = req.params;
  const updates = req.body;

  try {
    // Find and update the student by roll number
    const student = await Student.findOneAndUpdate({ rollno }, updates, { new: true });
    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }

    // Send the updated student information back to the client
    res.status(200).send({ message: 'Student updated successfully', student });
  } catch (err) {
    console.error('Error updating student:', err);
    res.status(500).send({ message: 'Server error', error: err.message });
  }
};

// Delete student by roll number
exports.deleteStudent = async (req, res) => {
  const { rollno } = req.params;

  try {
    // Find and delete the student by roll number
    const student = await Student.findOneAndDelete({ rollno });
    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }

    // Send success message
    res.status(200).send({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).send({ message: 'Server error', error: err.message });
  }
};

// Login student by roll number and password
exports.loginStudent = async (req, res) => {
    const { rollno, password } = req.body;
  
    try {
      // Find the student by roll number
      const student = await Student.findOne({ rollno });
      if (!student) {
        return res.status(404).send({ message: 'Student not found' });
      }
  
      // Check if the provided password matches the stored password
      if (password !== student.password) {
        return res.status(401).send({ message: 'Invalid credentials' });
      }
  
      // Send success message and student info back to the client
      res.status(200).send({ message: 'Login successful', student });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).send({ message: 'Server error', error: err.message });
    }
  };
  