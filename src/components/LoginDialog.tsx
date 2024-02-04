import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useLoginContext } from './LoginManager';
import { loginstatus, postLogin } from '../backend/api';

type LoginDialogProps = {
    show: boolean;
    handleClose: () => void;
};

export const LoginDialog: React.FC<LoginDialogProps> = ({ show, handleClose }) => {
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginError, setLoginError] = useState<string>("");

    const {loginInfo,setLoginInfo} = useLoginContext();


    async function onLogin() {
        try {
            console.log("Name:" + name);
            console.log("Password:" + password);

            const response = await postLogin(name, password);
            console.log("LoginInfo" + response.id)
            
            let isAdmin: boolean = false;
                if(response.role === "a"){
                    isAdmin =true;
                }

        setLoginInfo({userId: response.id, admin: isAdmin})


            handleClose(); // Schließen des Dialogs
            setLoginError(""); // Zurücksetzen des Fehlerstatus
        } catch (error) {
            console.error("Login fehlgeschlagen", error);
            setLoginError("Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.");
        }
    }

    useEffect(() => {
        console.log("WURDE AKTUALISIERT: ", loginInfo)
        
    }, [loginInfo])

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="Name"
                            placeholder="Benutzername eingeben"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="Password">
                        <Form.Label>Passwort</Form.Label>
                        <Form.Control
                            type="password"
                            name="Passwort"
                            placeholder="Passwort"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Abbrechen
                </Button>
                <Button variant="primary" onClick={onLogin}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
