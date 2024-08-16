import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import '../style/login.css';

const API_URL = 'http://localhost:5000';

const Login = () => {
  const navigate = useNavigate();
  const [rollno, setRollno] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/user/login`, { rollno, password });

      localStorage.setItem('rollno', rollno);

      setMessage('Login successful!');

      if (response.data.student.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/complaint');
      }
    } catch (error) {
      setMessage('Incorrect Rollno or Password, Please try again');
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="login-page">
      <Container className="d-flex justify-content-start align-items-center min-vh-100">
        <div className="form-wrapper w-75">
          <div className="form-container p-4">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label style={{color:'white', fontSize:'20px', fontWeight: 'bold'}}>Roll No. <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your Roll No."
                  value={rollno}
                  onChange={(e) => setRollno(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label style={{color:'white', fontSize:'20px', fontWeight: 'bold'}}>Password <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Log In
              </Button>
              {message && <div className="alert alert-info mt-3">{message}</div>}
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
