import React, { useState } from 'react';
import { Button, Container, Nav, Navbar, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { LoginDialog } from './LoginDialog';
import './navbar.css';
import { useLoginContext } from './LoginManager';
import { logout } from '../backend/api';


export function NavigationBar() {

    // Zustandsvariable für die Anzeige des Login-Modals
    const [loginmodal, setloginmodal] = useState(false);
    const {loginInfo, setLoginInfo} = useLoginContext();
    // Funktion zum Öffnen des Login-Modals
    const loginanzeigen = () => setloginmodal(true);
    // Funktion zum Schließen des Login-Modals
    const loginschließen = () => setloginmodal(false);

    const ausloggen = async () => {
        setLoginInfo(false);
        await logout();
        setLoginInfo (false)
        
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
                            { loginInfo ? (
                                <>
                                    <LinkContainer to="/admin"><Nav.Link>Admin</Nav.Link></LinkContainer>
                                    <LinkContainer to="/prefs"><Nav.Link>Preferences</Nav.Link></LinkContainer>
                                </>
                            ) : null }
                            
                            { loginInfo ? (
                                <Nav.Link onClick={ausloggen}>Logout</Nav.Link>
                                
                            ) : (
                                <Nav.Link onClick={loginanzeigen}>Login</Nav.Link>
                            )}
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control type="search" placeholder="Suchen" className="me-2" aria-label="Search" />
                            <Button variant="outline-dark">Suchen</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <LoginDialog show={loginmodal} handleClose={loginschließen} />
        </>
    );
}

export default NavigationBar;
