import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

const MyNavbar = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    // Remove rollno from localStorage
    localStorage.removeItem('rollno');

    // Navigate to home page
    navigate('/');
  };

  return (
    <Navbar style={{ backgroundColor: 'rgb(198, 192, 192)' }} expand="lg" className="p-3">
      <Navbar.Brand
        href="#"
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginLeft: '30px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span style={{ color: '#FF671F' }}>Rajendra</span>&nbsp;
        <span style={{ color: '#FFFFFF' }}>Prasad</span>&nbsp;
        <span style={{ color: '#046A38' }}>Hall</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="ml-auto">
          <Button variant="outline-primary" onClick={handleLogout} style={{ marginRight: '20px' }} >
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
