const Complaint = require('../models/complaint');

// Create a new complaint
exports.createComplaint = async (req, res) => {
    const {rollno, name, roomNo, phoneNo, type, userComplaintRemark } = req.body;

    try {
        const newComplaint = new Complaint({
            rollno,
            name,
            roomNo,
            phoneNo,
            type,
            userComplaintRemark
        });

        await newComplaint.save();
        res.status(201).json({ message: 'Complaint created successfully', complaint: newComplaint });
    } catch (err) {
        console.error('Error creating complaint:', err);
        res.status(500).json({ message: 'Error creating complaint', error: err.message });
    }
};

// Get all complaints with filtering options
exports.getComplaints = async (req, res) => {
  const { type, status } = req.query;

  try {
    // Build the query based on provided filters
    const query = {};
    if (type) query.type = type;
    if (status) query.status = status;

    // Find complaints based on the query
    const complaints = await Complaint.find(query).sort({ date: -1 });

    // Send the complaints back to the client
    res.status(200).json({ complaints });
  } catch (err) {
    console.error('Error fetching complaints:', err);
    res.status(500).json({ message: 'Error fetching complaints' });
  }
};

// Update a complaint's status and remarks
exports.updateComplaint = async (req, res) => {
  const { complainId } = req.params;
  const { status, adminComplaintRemark } = req.body;

  try {
    // Find and update the complaint
    const complaint = await Complaint.findOneAndUpdate(
      { complainId },
      { status, adminComplaintRemark },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Send the updated complaint back to the client
    res.status(200).json({ message: 'Complaint updated successfully', complaint });
  } catch (err) {
    console.error('Error updating complaint:', err);
    res.status(500).json({ message: 'Error updating complaint' });
  }
};

// Get a single complaint by ID
exports.getComplaintById = async (req, res) => {
  const { complainId } = req.params;

  try {
    // Find the complaint by ID
    const complaint = await Complaint.findOne({ complainId });

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Send the complaint back to the client
    res.status(200).json({ complaint });
  } catch (err) {
    console.error('Error fetching complaint:', err);
    res.status(500).json({ message: 'Error fetching complaint' });
  }
};

// Get all complaints by rollno
exports.getComplaintsByRollNo = async (req, res) => {
    const { rollno } = req.params;

    try {
        const complaints = await Complaint.find({ rollno });

        if (complaints.length === 0) {
            return res.status(404).json({ message: 'No complaints found for this roll number' });
        }

        res.status(200).json({ complaints });
    } catch (err) {
        console.error('Error fetching complaints by roll number:', err);
        res.status(500).json({ message: 'Server error' });
    }
};