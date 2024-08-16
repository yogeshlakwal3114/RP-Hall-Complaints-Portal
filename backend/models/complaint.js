const mongoose = require('mongoose');

// Define the Complaint schema
const complaintSchema = new mongoose.Schema({
    complainId: {
        type: String,
        required: true,
        unique: true,
        default: function () {
            const prefix = this.type ? this.type.substring(0, 2).toUpperCase() : 'XX';
            const id = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
            return `${prefix}${id}`;
        }
    },
    rollno: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    roomNo: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\+\d{1,3}\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    type: {
        type: String,
        required: true,
        enum: ['Electricity', 'Water', 'Furniture', 'Mess', 'Cleaning', 'Others']
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Processing', 'Resolved'],
        default: 'Pending'
    },
    userComplaintRemark: {
        type: String,
        required: true
    },
    adminComplaintRemark: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: function() {
            const now = new Date();
            return new Date(now.getFullYear(), now.getMonth(), now.getDate());
        }
    }
});

// Create a model from the schema
const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
