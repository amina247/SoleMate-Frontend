import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/auth.context";

function LoginPage() {
    const { storeToken } = useContext(AuthContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const API_URL = 'http://localhost:5005';

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = { email, password };

        console.log(requestBody);

        axios
            .post(`${API_URL}/auth/login`, requestBody)
            .then((response) => {
                console.log('JWT token', response.data.authToken);

                storeToken(response.data.authToken);
            })
            .catch((error) => console.log(error));

    }

    return (
        <div style={{
            display: 'block',
            width: 700,
            padding: 30
        }}>
            <h4>Login Here!</h4>
            <Form onSubmit={handleSubmit}>
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
                    Click here to login!
                </Button>
            </Form>
        </div>
    );
}

export default LoginPage;
