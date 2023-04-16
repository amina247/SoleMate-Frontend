import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import NavigationBar from '../components/navBar';



function SignUpPage() {
    const API_URL = 'http://localhost:5005';
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [alertShown, setAlertShown] = useState(false);
    const [alertText, setAlertText] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password, name };

        axios
            .post(`${API_URL}/auth/signup`, requestBody)
            .then((response) => {
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
                setAlertShown(true);
                setAlertText(error.response.data.message);
            });

    }

    return (
        <div style={{
            display: 'block',
            width: 700,
            padding: 30
        }}>
            <NavigationBar />

            <h4>Sign Up Here!</h4>
            <div hidden={!alertShown}>
                <Alert key={"danger"} variant={"danger"}>
                    {alertText}
                </Alert>
            </div>
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
            <p>already a user? <a href='/login'>Login Here</a></p>
        </div>
    );
}

export default SignUpPage;
