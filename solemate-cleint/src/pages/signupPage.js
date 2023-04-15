import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import axios from 'axios';

function SignUpPage() {
    const API_URL = 'http://localhost:5005';
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password, name };

        axios
            .post(`${API_URL}/auth/signup`, requestBody)
            .then((response) => {
                console.log('resp', response);
            })
            .catch((error) => console.log(error));

    }

    return (
        <div style={{
            display: 'block',
            width: 700,
            padding: 30
        }}>
            <h4>Sign Up Here!</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Enter your full name:</Form.Label>
                    <Form.Control type="text"
                        placeholder="Enter your full name" onChange={(event) => setName(event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter your email address:</Form.Label>
                    <Form.Control type="email"
                        placeholder="Enter your your email address" onChange={(event) => setEmail(event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter your password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" onChange={(event) => setPassword(event.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Click here to sign up!
                </Button>
            </Form>
        </div>
    );
}

export default SignUpPage;
