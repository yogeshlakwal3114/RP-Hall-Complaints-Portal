const express = require('express');
const router = express.Router();
const complaintController = require('../controller/complaintController');

// Routes for complaints
router.post('/', complaintController.createComplaint);
router.get('/', complaintController.getComplaints);
router.put('/:complainId', complaintController.updateComplaint);
router.get('/:complainId', complaintController.getComplaintById);
router.get('/rollno/:rollno', complaintController.getComplaintsByRollNo);

module.exports = router;
