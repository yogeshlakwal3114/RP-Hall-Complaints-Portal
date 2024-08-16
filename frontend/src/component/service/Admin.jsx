import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Form, Modal, Row, Col } from 'react-bootstrap';
import { FaFilePdf } from 'react-icons/fa';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import axios from 'axios';
import Navbaradmin from './adminnavbar';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const API_URL = 'http://localhost:5000'; // Replace with your actual backend URL
const complaintTypes = ['Electrical', 'Water', 'Furniture', 'Mess', 'Cleaning', 'Others'];
const complaintStatus = ['Pending', 'Processing', 'Resolved'];

const AdminPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [modalShow, setModalShow] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [adminRemark, setAdminRemark] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    applyFilters(complaints);
  }, [selectedType, selectedStatus, complaints]);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(`${API_URL}/complaint/`);
      const data = response.data.complaints;

      const sortedData = data.sort((a, b) => {
        if (a.status === 'Pending' && b.status !== 'Pending') return -1;
        if (a.status !== 'Pending' && b.status === 'Pending') return 1;
        return new Date(b.date) - new Date(a.date);
      });

      setComplaints(sortedData);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const applyFilters = (data) => {
    let filtered = data;

    if (selectedType !== 'All') {
      filtered = filtered.filter(complaint => complaint.type === selectedType);
    }
    if (selectedStatus !== 'All') {
      filtered = filtered.filter(complaint => complaint.status === selectedStatus);
    }

    setFilteredComplaints(filtered);
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

  const handleStatusChange = (complainId, newStatus) => {
    const updatedComplaints = complaints.map(complaint =>
      complaint.complainId === complainId ? { ...complaint, status: newStatus } : complaint
    );
    setComplaints(updatedComplaints);
  };

  const handleAdminRemarkChange = (remarks) => {
    setAdminRemark(remarks);
  };

  const saveChanges = async () => {
    try {
      const { complainId, status } = selectedComplaint;
      await axios.put(`${API_URL}/complaint/${complainId}`, { status, adminComplaintRemark: adminRemark });

      const updatedComplaints = complaints.map(complaint =>
        complaint.complainId === complainId ? { ...complaint, status, adminComplaintRemark: adminRemark } : complaint
      );

      setComplaints(updatedComplaints);
      setModalShow(false);
    } catch (error) {
      console.error('Error updating complaint status:', error);
    }
  };

  const generatePdf = (complaint) => {
    const docDefinition = {
        content: [
            {
                text: `Complaint Number: ${complaint.complainId}`,
                style: 'complaintNumber',
                alignment: 'right',
                margin: [0, 0, 0, 10]
            },
            {
                text: 'Complaint Details',
                style: 'header',
                alignment: 'center',
                margin: [0, 10, 0, 10]
            },
            {
                table: {
                    widths: ['35%', '65%'],
                    body: [
                        [
                            { text: 'Name:', bold: true, border: [true, true, false, true] },
                            { text: complaint.name, border: [false, true, true, true] }
                        ],
                        [
                            { text: 'Room No.:', bold: true, border: [true, true, false, true] },
                            { text: complaint.roomNo, border: [false, true, true, true] }
                        ],
                        [
                          { text: 'Phone no.:', bold: true, border: [true, true, false, true] },
                          { text: complaint.phoneNo, border: [false, true, true, true] }
                        ],
                        [
                            { text: 'Type of Complaint:', bold: true, border: [true, true, false, true] },
                            { text: complaint.type, border: [false, true, true, true] }
                        ],

                        [
                            { text: 'User Remarks:', bold: true, border: [true, true, false, true] },
                            { text: complaint.userComplaintRemark || 'No user remarks provided.', border: [false, true, true, true] }
                        ],
                    ]
                },
                layout: {
                    fillColor: (rowIndex) => (rowIndex % 2 === 0 ? '#f2f2f2' : null) // Optional: Alternate row colors for better readability
                },
                margin: [0, 0, 0, 20]
            },
            {
                text: 'Student Signature',
                style: 'signature',
                alignment: 'right',
                margin: [0, 50, 0, 0]
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true
            },
            complaintNumber: {
                fontSize: 12,
                bold: true
            },
            signature: {
                fontSize: 14,
                bold: true,
                decoration: 'underline'
            }
        },
        defaultStyle: {
            border: [true, true, true, true]
        }
    };

    pdfMake.createPdf(docDefinition).download(`complaint-${complaint.complainId}.pdf`);
};


  return (
    <>
    <Navbaradmin/>
    <div className="container mt-5">
      <h1 className="text-center">Admin Dashboard</h1>
      <Row className="mb-3">
        <Col style={{flex : '0'}}>
          <Dropdown onSelect={handleTypeFilter}>
            <Dropdown.Toggle variant="primary" id="typeFilter">
              {selectedType !== 'All' ? selectedType : 'Filter by Complaint Type'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              {complaintTypes.map(type => (
                <Dropdown.Item key={type} eventKey={type}>{type}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown onSelect={handleStatusFilter}>
            <Dropdown.Toggle variant="primary" id="statusFilter">
              {selectedStatus !== 'All' ? selectedStatus : 'Filter by Status'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              {complaintStatus.map(status => (
                <Dropdown.Item key={status} eventKey={status}>{status}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Complaint ID</th>
            <th>Name</th>
            <th>Room No.</th>
            <th>Type</th>
            <th>Status</th>
            <th>User Remarks</th>
            <th>Admin Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredComplaints.map((complaint, index) => (
            <tr key={complaint.complainId}>
              <td>{index + 1}</td>
              <td>{complaint.complainId}</td>
              <td>{complaint.name}</td>
              <td>{complaint.roomNo}</td>
              <td>{complaint.type}</td>
              <td>
                <Form.Control
                  as="select"
                  value={complaint.status}
                  onChange={e => handleStatusChange(complaint.complainId, e.target.value)}
                  style={{
                    color: complaint.status === 'Pending' ? 'red' :
                          complaint.status === 'Processing' ? 'grey' : 'green'
                  }}
                >
                  {complaintStatus.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </Form.Control>
              </td>
              <td>{complaint.userComplaintRemark}</td>
              <td>
                <Form.Control
                  as="textarea"
                  rows={1}
                  value={complaint.complainId === selectedComplaint?.complainId ? adminRemark : complaint.adminComplaintRemark || ''}
                  onChange={e => { 
                    setSelectedComplaint(complaint);
                    handleAdminRemarkChange(e.target.value); 
                  }}
                  style={{ minHeight: '30px', resize: 'none' }}
                />
              </td>
              <td className="d-flex justify-content-between">
                <Button variant="info" onClick={() => { setSelectedComplaint(complaint); setAdminRemark(complaint.adminComplaintRemark || ''); setModalShow(true); }}>
                  View
                </Button>
                <Button variant="danger" onClick={() => generatePdf(complaint)} className="ml-2">
                  <FaFilePdf /> PDF
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Complaint Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedComplaint && (
            <div>
              <h5>Complaint ID: {selectedComplaint.complainId}</h5>
              <p><strong>Name:</strong> {selectedComplaint.name}</p>
              <p><strong>Room No.:</strong> {selectedComplaint.roomNo}</p>
              <p><strong>Type:</strong> {selectedComplaint.type}</p>
              <p><strong>Status:</strong> {selectedComplaint.status}</p>
              <Form.Group>
                <Form.Label>Admin Remarks</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={adminRemark}
                  onChange={e => handleAdminRemarkChange(e.target.value)}
                  style={{ minHeight: '30px', resize: 'none' }}
                />
              </Form.Group>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default AdminPage;
