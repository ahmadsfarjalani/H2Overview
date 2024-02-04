import React, { useState } from 'react';
import { Button, Container, Nav, Navbar, Form, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { LoginDialog } from './LoginDialog';
import { useLoginContext } from './LoginManager';
import { logout } from '../backend/api';
import './navbar.css';

export function NavigationBar() {
    const [loginModal, setLoginModal] = useState(false); 
    const { loginInfo, setLoginInfo } = useLoginContext();

    const handleLoginShow = () => setLoginModal(true);
    const handleLoginClose = () => setLoginModal(false);
    const handleLogout = async () => {
        await logout(); 
        setLoginInfo(false);
    };

    return (
        <>
            <Navbar expand="lg" collapseOnSelect className="navbar-hellblau" fixed="top">
                <Container fluid>
                    <Navbar.Brand href="#" className="display-4 fw-bold">H2Overview Trinkprotokolle</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto my-2 my-lg-0">
                            <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
                            {loginInfo && (
                                <>
                                    <LinkContainer to="/admin"><Nav.Link>Admin</Nav.Link></LinkContainer>
                                    <LinkContainer to="/prefs"><Nav.Link>Preferences</Nav.Link></LinkContainer>
                                </>
                            )}
                            <Nav.Link onClick={loginInfo ? handleLogout : handleLoginShow}>
                                {loginInfo ? 'Logout' : 'Login'}
                            </Nav.Link>
                            {loginInfo && (
                                <Row className="mb-3">
                                    <LinkContainer to="/protokoll/neu"><Nav.Link>Neues Protokoll</Nav.Link></LinkContainer>
                                </Row>
                            )}
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control type="search" placeholder="Suchen" className="me-2" aria-label="Search" />
                            <Button variant="outline-dark">Suchen</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <LoginDialog show={loginModal} handleClose={handleLoginClose} />
        </>
    );
}

export default NavigationBar;
