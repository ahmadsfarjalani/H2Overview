import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EintragResource, ProtokollResource } from "../Resources";
import { Eintrag } from "./Eintrag";
import { getAlleEintraege, getEintrag, getProtokoll } from "../backend/api";
import LoadingIndicator from "./LoadingIndicator";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

export default function PageProtokoll() {
    const [myEintrag, setMyEintrag] = useState<EintragResource | null>();
    const { eintragId } = useParams();
    


    useEffect(() => {
        async function load() {
            const response = await getEintrag(eintragId!);
            setMyEintrag(response);
        }
        load();
    }, [eintragId]);

    if (!myEintrag) {
        return <LoadingIndicator />;
    } else {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <Card>
                            <Card.Header>Eintrag von {myEintrag.erstellerName}</Card.Header>
                            <Card.Body>
                                <Card.Title>{myEintrag.getraenk} - {myEintrag.menge}ml</Card.Title>
                                <Card.Text>
                                    Kommentar: {myEintrag.kommentar}<br />
                                    Eintrag erstellt am: {myEintrag.createdAt}<br />
                                    Protokoll ID: {myEintrag.protokoll}
                                </Card.Text>
                                <Link to={`/protokoll/${myEintrag.protokoll}`}>
                                    <Button variant="secondary">Zurück zu allen Einträgen des Protokolls</Button>
                                </Link>
                            </Card.Body>
                            <Card.Footer className="text-muted">Ersteller ID: {myEintrag.ersteller}</Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}