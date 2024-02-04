import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { deleteProtokoll, getAlleEintraege, getProtokoll, updateProtokoll } from "../backend/api"; 
import LoadingIndicator from "./LoadingIndicator";
import { EintragResource, ProtokollResource } from "../Resources";
import { useLoginContext } from "./LoginManager";
import { LinkContainer } from "react-router-bootstrap";


export default function PageProtokoll() {
    let e : any;


    
    const [myProtokoll, setMyProtokoll] = useState<ProtokollResource | null>(null);
    const [myEintraege, setMyEintraege] = useState<EintragResource[] | null>(null);
    const [show, setShow] = useState(false); 
    const [patient, setPatient] = useState("");
    const [datum, setDatum] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [isClosed, setIsClosed] = useState(false);
    const { loginInfo } = useLoginContext();
    const [showDeleteModal, setShowDeleteModal] = useState(false); 



    const { protokollId } = useParams<{ protokollId: string }>();

    useEffect(() => {
        async function load() {
            const response = await getProtokoll(protokollId!);
            const response1 = await getAlleEintraege(protokollId!);
            setMyProtokoll(response);
            setMyEintraege(response1);
            setPatient(response.patient);
            setDatum(response.datum);
        }
        load();
    }, [protokollId]);

    const [handleShow , setHandleShow] = useState(false);

    
    async function updateProtokolle() {
        setHandleShow(false)
        if (loginInfo) {
            e = loginInfo.userId
        }

    const protokollDaten = {
        id : protokollId,
        patient : patient,
        public : isPublic,
        closed : isClosed,
        datum : datum,
        ersteller:myProtokoll!.ersteller,

        

    };
    
    console.log("id=" + e!)
    try {
        setMyProtokoll(await updateProtokoll(protokollDaten))
    }
    catch(error) {
        console.error('Fehler beim Erstellen des Protokolls', error);
    }
    }

    async function deleteDasProtokoll() {
        await deleteProtokoll(protokollId!)
        console.log("Protokoll löschen:", protokollId);
        setShowDeleteModal(false); 
    }

    if (!myProtokoll || !myEintraege) {
        return <LoadingIndicator />;
    } else {
        return (
            <div style={{ marginTop: "5rem" }}>
                <Container>
                    <Row className="mb-3">
                        <Col>
                            <Card className="text-center">
                                <Card.Header>{myProtokoll.erstellerName}</Card.Header>
                                <Card.Body>
                                    <Card.Title>Patient: {myProtokoll.patient}</Card.Title>
                                    <Card.Text>
                                        Protokoll erstellt am: {myProtokoll.datum}<br />
                                        Öffentlich: {String(myProtokoll.public)}<br />
                                        Geschlossen: {String(myProtokoll.closed)}<br />
                                        Letztes Update: {myProtokoll.updatedAt}<br />
                                        Gesamtanzahl der Einträge: {myProtokoll.gesamtMenge}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => setHandleShow(true)}>Editieren</Button>
                                    <Button variant="danger" className="ms-2" onClick={() => setShowDeleteModal(true)}>Protokoll löschen</Button>
                                </Card.Body>
                                <Card.Footer className="text-muted">Protokoll ID: {protokollId}</Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                    {myEintraege.map((eintrag) => (
                        <Row key={eintrag.id} className="mb-3">
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Eintrag {eintrag.id} vom {eintrag.createdAt}</Card.Title>
                                        <Link to={`/eintrag/${eintrag.id}`} className="btn btn-primary">
                                            Eintrag anzeigen
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    ))}
                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Protokoll löschen</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Sind Sie sicher, dass Sie dieses Protokoll löschen möchten?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                Abbrechen
                            </Button>
                            <LinkContainer to = "/">
                            <Button variant="danger" onClick={deleteDasProtokoll}>
                                Löschen
                            </Button>
                            </LinkContainer>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
        );
}
}