import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthContext } from "../context/auth.context";
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';


function NavigationBar() {
    const [isLoggedIn, setIsLoggedIn] = useState();
    const { getIsLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('heree');
        logout();
        navigate('/');
    }

    useEffect(() => {
        const logged = getIsLoggedIn();
        setIsLoggedIn(logged);
    })


    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">My Website</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/shoe-list">Shoe List</Nav.Link>
                        {isLoggedIn && <Nav.Link href="/add-shoe">Add Shoe</Nav.Link>}
                        {isLoggedIn && <Nav.Link href="/offers">Your Offers</Nav.Link>}
                        {!isLoggedIn && <NavDropdown title="Join Us" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
                            <NavDropdown.Item href="/login">Log in</NavDropdown.Item>
                        </NavDropdown>}
                        {isLoggedIn && <Nav.Link onClick={handleLogout}>Log out</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;