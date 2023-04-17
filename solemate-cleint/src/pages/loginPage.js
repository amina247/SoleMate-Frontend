import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/auth.context";
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import NavigationBar from '../components/navBar';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

function LoginPage() {
    const { storeToken } = useContext(AuthContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const [alertShown, setAlertShown] = useState(false);
    const [alertText, setAlertText] = useState();

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
                navigate('/');
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
                            <h2 className="fw-bold mb-2 text-center">Login</h2>
                            <p className="text-dark-50 mb-3">Please enter your login and password!</p>

                            <div hidden={!alertShown}>
                                <Alert key={"danger"} variant={"danger"}>
                                    {alertText}
                                </Alert>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg" onChange={(event) => setEmail(event.target.value)} />
                                <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg" onChange={(event) => setPassword(event.target.value)} />
                                <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />
                                <MDBBtn size='lg' type="submit">
                                    Login
                                </MDBBtn>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default LoginPage;
