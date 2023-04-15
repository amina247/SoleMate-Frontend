import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React from 'react';


function SignUpPage() {
    return (
        <div style={{
            display: 'block',
            width: 700,
            padding: 30
        }}>
            <h4>Sign Up Here!</h4>
            <Form>
                <Form.Group>
                    <Form.Label>Enter your full name:</Form.Label>
                    <Form.Control type="text"
                        placeholder="Enter your full name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter your email address:</Form.Label>
                    <Form.Control type="email"
                        placeholder="Enter your your email address" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter your password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Click here to sign up!
                </Button>
            </Form>
        </div>
    );
}

export default SignUpPage;
