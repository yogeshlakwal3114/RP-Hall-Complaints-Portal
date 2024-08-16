import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../service/navbar';
import Footer from '../service/Footer';
import '../style/ComplaintForm.css'; // Import your custom CSS

const API_URL = 'http://localhost:5000'; // Replace with your backend URL

const ComplaintForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        roomBlock: 'A', // Default to 'A'
        roomNo: '',
        phoneNo: '+91',
        complaintType: '',
        complaint: ''
    });

    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const rollno = localStorage.getItem('rollno');

        try {
            const response = await axios.post(`${API_URL}/complaint`, {
                rollno,
                name: formData.name,
                roomNo: `${formData.roomBlock}-${formData.roomNo}`, // Combine block and room number
                phoneNo: formData.phoneNo,
                type: formData.complaintType,
                userComplaintRemark: formData.complaint,
                adminComplaintRemark: ''
            });

            setMessage({ type: 'success', text: 'Your complaint has been submitted!' });

            // Reset the form
            setFormData({
                name: '',
                roomBlock: 'A',
                roomNo: '',
                phoneNo: '+91',
                complaintType: '',
                complaint: ''
            });
        } catch (error) {
            console.error('Error submitting complaint:', error);
            setMessage({ type: 'error', text: 'Error submitting complaint: ' + error.message });
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="complaint-container border rounded p-4 bg-light">
                    <div className="text-center mb-4">
                        <h2 className="text-primary">Submit Your Complaint</h2>
                        <p className="text-muted">Please fill out the form below to submit your complaint.</p>
                    </div>
                    {message.text && (
                        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                            {message.text}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="mb-3 row">
                            <div className="col-md-6">
                                <label htmlFor="roomBlock" className="form-label">Block</label>
                                <select 
                                    className="form-select" 
                                    id="roomBlock" 
                                    value={formData.roomBlock} 
                                    onChange={handleChange} 
                                    required
                                >
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="roomNo" className="form-label">Room No.</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="roomNo" 
                                    value={formData.roomNo} 
                                    onChange={handleChange} 
                                    pattern="\d{3}" 
                                    required 
                                />
                                <div className="form-text">Enter a 3-digit room number (e.g., 101).</div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNo" className="form-label">Phone No.</label>
                            <input 
                                type="tel" 
                                className="form-control" 
                                id="phoneNo" 
                                pattern="\+91\d{10}" 
                                value={formData.phoneNo} 
                                onChange={handleChange} 
                                required 
                            />
                            <div className="form-text">Format: +91XXXXXXXXXX</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="complaintType" className="form-label">Complaint Type</label>
                            <select 
                                className="form-select" 
                                id="complaintType" 
                                value={formData.complaintType} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="" disabled>Select a type</option>
                                <option value="Electricity">Electricity</option>
                                <option value="Water">Water</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Mess">Mess</option>
                                <option value="Cleaning">Cleaning</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="complaint" className="form-label">Your Complaint</label>
                            <textarea 
                                className="form-control" 
                                id="complaint" 
                                rows="1" // Initial height of textarea
                                onChange={handleChange} 
                                value={formData.complaint}
                                onInput={(e) => {
                                    e.target.style.height = 'auto'; 
                                    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height based on content
                                }}
                                required
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-lg w-50">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ComplaintForm;
