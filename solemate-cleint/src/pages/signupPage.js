import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import NavigationBar from '../components/navBar';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, } from 'mdb-react-ui-kit';

function SignUpPage() {
    const API_URL = process.env.REACT_APP_SERVER;
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
        <MDBContainer fluid>
            <NavigationBar />
            <MDBRow className='d-flex justify-content-center align-items-center vh-100'>
                <MDBCol col='12'>
                    <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                            <h2 className="fw-bold mb-2 text-center">Sign up</h2>
                            <p className="text-dark-50 mb-3">Please enter your details to create an account!</p>

                            <div hidden={!alertShown}>
                                <Alert key={"danger"} variant={"danger"}>
                                    {alertText}
                                </Alert>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <MDBInput wrapperClass='mb-4 w-100' label='Full name' id='formControlLg' type='text' size="lg" onChange={(event) => setName(event.target.value)} />
                                <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg" onChange={(event) => setEmail(event.target.value)} />
                                <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg" onChange={(event) => setPassword(event.target.value)} />
                                <MDBBtn size='lg' type="submit">
                                    Sign up
                                </MDBBtn>
                            </form>
                            <p className="mt-3 text-center">
                                Already a user? <a href='/login'>Login Here</a>
                            </p>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default SignUpPage;
