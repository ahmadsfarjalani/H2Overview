import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { EintragResource } from "../Resources";
import LoadingIndicator from "./LoadingIndicator";
import { deleteEintrag, getEintrag, id, updateEintrag } from "../backend/api";
import { LinkContainer } from "react-router-bootstrap";
import { useLoginContext } from "./LoginManager";

export default function PageEintrag() {
    const { eintragId } = useParams();
    const [eintrag, setEintrag] = useState<EintragResource | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [getraenk, setGetraenk] = useState("");
    const [menge, setMenge] = useState<number | undefined>();
    const [kommentar, setKommentar] = useState("");
    const { loginInfo } = useLoginContext();

    useEffect(() => {
        const loadEintrag = async () => {
            const response = await getEintrag(eintragId!);
            setEintrag(response);
        };
        loadEintrag();
    }, [eintragId]);

    async function deleteeintr() {
        await deleteEintrag(eintragId!);
        setShowDeleteModal(false);
    }

    const handleSave = async () => {
        if (eintrag) {
            const eintragDaten = {
                id: eintragId!,
                getraenk: getraenk,
                kommentar: kommentar,
                menge: menge!,
                ersteller: eintrag.ersteller,
                protokoll: eintrag.protokoll!
            };
            await updateEintrag(eintragDaten);
            setShowEditModal(false);
        }
    };

    if (!eintrag) {
        return <LoadingIndicator />;
    } else {
        return (
            <div style={{ marginTop: "5rem" }}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={8}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{eintrag.getraenk} - {eintrag.menge}ml</Card.Title>
                                    <Card.Text>Kommentar: {eintrag.kommentar}</Card.Text>
                                    
                                    {loginInfo && id === eintrag.ersteller && <><Button variant="primary" onClick={() => setShowEditModal(true)}>Editieren</Button>
                                    <Button variant="danger" className="ms-2" onClick={() => setShowDeleteModal(true)}>Löschen</Button></>}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Eintrag bearbeiten</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Getränk</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Getränk"
                                        value={getraenk}
                                        onChange={(e) => setGetraenk(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Menge</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Menge in ml"
                                        value={menge}
                                        onChange={(e) => setMenge(parseInt(e.target.value) || undefined)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Kommentar</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Kommentar"
                                        value={kommentar}
                                        onChange={(e) => setKommentar(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Abbrechen</Button>
                            <Button variant="primary" onClick={handleSave}>Speichern</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Löschen</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Sind Sie sicher, dass Sie diesen Eintrag löschen möchten?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Abbrechen</Button>
                            <LinkContainer to = {`/protokoll/${eintrag.protokoll}`}>
                            <Button variant="danger" onClick={deleteeintr}>OK</Button>
                            </LinkContainer>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
        );
    }
}
