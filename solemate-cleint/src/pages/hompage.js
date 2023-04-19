import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavigationBar from '../components/navBar';
import logo from '../assets/logo.png';
import '../assets/homePage.css';

function HomePage() {
  return (
    <div>
      <NavigationBar />
      <Container className="home-page">
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <img src={logo} alt="SoleMate Logo" fluid style={{ width: '100%', height: 'auto', margin: 'auto', display: 'block' }} />
            <p>
              Welcome to SoleMate, the ultimate platform for sneaker enthusiasts!
              Discover unique sneaker collections, showcase your own, and connect with
              like-minded individuals. Whether you're a collector or just someone who
              appreciates the art of sneakers, SoleMate is the perfect place for you.
            </p>
            <p>
              Ready to start? Create an account or log in and explore the world of
              SoleMate today!
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
