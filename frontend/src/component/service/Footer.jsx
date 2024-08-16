import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaPhoneAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import '../style/Footer.css'; // Make sure to include the CSS file

const Footer = () => {
    return (
        <footer className="footer text-light pt-4">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>Contact Information</h5>
                        <ul className="list-unstyled">
                            <li><FaPhoneAlt /> Warden: +91 98765 43210</li>
                            <li><FaPhoneAlt /> Manager: +91 98765 43211</li>
                            <li><FaPhoneAlt /> Security: +91 98765 43212</li>
                            <li><FaPhoneAlt /> BC ROY Hospital: +91 98765 43213</li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light">Home</a></li>
                            <li><a href="#" className="text-light">About</a></li>
                            <li><a href="#" className="text-light">Contact</a></li>
                            <li><a href="#" className="text-light">FAQ</a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Connect with Us</h5>
                        <ul className="social-icons">
                            <li><a href="#" className="text-light"><FaFacebook size={24} /></a></li>
                            <li><a href="#" className="text-light"><FaTwitter size={24} /></a></li>
                            <li><a href="#" className="text-light"><FaInstagram size={24} /></a></li>
                            <li><a href="#" className="text-light"><FaLinkedin size={24} /></a></li>
                        </ul>
                    </Col>
                </Row>
                <hr className="bg-light" />
                <Row>
                    <Col className="text-center">
                        <p>&copy; 2024 Rajendra Prasad Hall. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
