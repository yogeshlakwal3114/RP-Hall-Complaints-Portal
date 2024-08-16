import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, Modal, Button, Table } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000'; // Replace with your backend URL

const MyNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  const rollno = localStorage.getItem('rollno'); // Assuming rollno is stored in localStorage

  const handleClose = () => setShowModal(false);

  const handleShow = async () => {
    try {
      const userResponse = await axios.get(`${API_URL}/user/${rollno}`);
      setUserInfo(userResponse.data.student);

      const complaintResponse = await axios.get(`${API_URL}/complaint/rollno/${rollno}`);
      setComplaints(Array.isArray(complaintResponse.data.complaints) ? complaintResponse.data.complaints : []);
      
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setComplaints([]);
    }
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { color: 'red' };
      case 'processing':
        return { color: 'grey' };
      case 'resolved':
        return { color: 'rgb(14 102 36)' };
      default:
        return {};
    }
  };

  const handleLogout = () => {
    // Remove rollno from localStorage
    localStorage.removeItem('rollno');

    // Navigate to home page
    navigate('/');
  };

  return (
    <>
      <Navbar style={{ backgroundColor: ' rgb(198 192 192)  ' }} expand="lg">
        <Navbar.Brand href="#" style={{ fontSize: '2rem', fontWeight: 'bold', marginLeft: '30px' }}>
          <strong style={{ color: '#FF671F' }}>Rajendra </strong>
          <strong style={{ color: '#FFFFFF' }}>Prasad </strong>
          <strong style={{ color: '#046A38' }}>Hall</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link href="#" onClick={handleShow} style={{ fontSize: '1.2rem' }}>
              <FaUserCircle style={{ fontSize: '2rem', marginRight: '20px' }} />
            </Nav.Link>
            <Button variant="outline-primary" onClick={handleLogout} style={{ marginRight: '20px'}}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} centered dialogClassName="modal-lg modal-dialog-centered">
        <Modal.Header closeButton>
          <Modal.Title>Your Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ marginBottom: '8px' }}><b>Roll No:</b> {userInfo.rollno}</p>
          <p style={{ marginBottom: '8px' }}><b>Department:</b> {userInfo.department}</p>
          <p style={{ marginBottom: '8px' }}><b>Phone No:</b> {userInfo.phone_no}</p>
          <p style={{ marginBottom: '8px' }}><b>Year of Passing:</b> {userInfo.year_of_passing}</p>

          <h5>Your Complaints</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Complaint Type</th>
                <th>Admin Remark</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.length > 0 ? (
                complaints.map((complaint) => (
                  <tr key={complaint.complainId}>
                    <td>{complaint.complainId}</td>
                    <td>{complaint.type}</td>
                    <td>{complaint.adminComplaintRemark || 'N/A'}</td>
                    <td style={getStatusStyle(complaint.status)}>{complaint.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyNavbar;
