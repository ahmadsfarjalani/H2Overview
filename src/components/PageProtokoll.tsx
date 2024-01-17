import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EintragResource, ProtokollResource } from "../Resources";
import { Eintrag } from "./Eintrag";
import { getAlleEintraege, getProtokoll } from "../backend/api";
import LoadingIndicator from "./LoadingIndicator";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

export default function PageProtokoll() {
    const [myProtokoll, setMyProtokoll] = useState<ProtokollResource>();
    const [myEintraege, setMyEintraege] = useState<EintragResource[] | null>();
    const { protokollId } = useParams();



    useEffect(() => {
        async function load() {
            const response = await getProtokoll(protokollId!);
            const response1 = await getAlleEintraege(protokollId!);
            setMyProtokoll(response);
            setMyEintraege(response1);
        }
        load();
    }, [protokollId]);

    if (!myProtokoll || !myEintraege) {
        return <LoadingIndicator />;
    } else {
        return (
            <Container>
                <Row className="mb-3">
                    <Col>
                        <Card className="text-center">
                            <Card.Header>{myProtokoll.erstellerName}</Card.Header>
                            <Card.Body>
                                <Card.Title>Patient : {myProtokoll.patient}</Card.Title>
                                <Card.Text>
                                    Protokoll erstellt am: {myProtokoll.datum}<br />
                                    Öffentlich: {String(myProtokoll.public)}<br />
                                    Geschlossen: {String(myProtokoll.closed)}<br />
                                    Letztes Update: {myProtokoll.updatedAt}<br />
                                    Gesamtanzahl der Einträge: {myProtokoll.gesamtMenge}
                                </Card.Text>
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
            </Container>
        );
    }
}
