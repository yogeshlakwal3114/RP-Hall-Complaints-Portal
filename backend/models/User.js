const mongoose = require('mongoose');

// Define the Student schema
const studentSchema = new mongoose.Schema({
    rollno: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    year_of_passing: {
        type: Number,
        required: true
    },
    phone_no: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\+\d{1,3}\d{10}$/.test(v); // Validates phone number format: +CountryCodeXXXXXXXXXX
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }

});



// Create a model from the schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
