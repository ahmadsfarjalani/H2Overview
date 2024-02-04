import React, { useContext, useEffect, useState } from "react";
import { ProtokollResource } from "../Resources";
import { Link, useNavigate } from "react-router-dom";
import { getAlleProtokolle } from "../backend/api";
import LoadingIndicator from "./LoadingIndicator";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLoginContext } from "./LoginManager";

export default function PageIndex() {
  const [myProtokolle, setMyProtokolle] = useState<ProtokollResource[] | null>(null);
  const { loginInfo } = useLoginContext();

  useEffect(() => {
    async function load() {
      try {
        const response = await getAlleProtokolle();
        setMyProtokolle(response);
      } catch (e) {
        console.error("FEHLER: ", e);
      }
    }
    load();
  }, [loginInfo]);

  if (!myProtokolle) {
    return <LoadingIndicator />;
  }

  return (
    <Container style={{ marginTop: '4rem' }}>
      {myProtokolle.map((protokoll, index) => (
        <Row key={protokoll.id} className="mb-3">
          <Col>
            <Card className="text-center">
              <Card.Header>Protokoll {index + 1}</Card.Header>
              <Card.Body>
                <Card.Title>Patient: {protokoll.patient}</Card.Title>
                <Card.Text>
                  Datum: {protokoll.datum}<br />
                  Öffentlich: {protokoll.public ? 'Ja' : 'Nein'}<br />
                  Geschlossen: {protokoll.closed ? 'Ja' : 'Nein'}<br />
                  Ersteller: {protokoll.erstellerName}<br />
                  Aktualisiert am: {protokoll.updatedAt}<br />
                  Gesamtmenge: {protokoll.gesamtMenge}
                </Card.Text>
                <Link to={`/protokoll/${protokoll.id}`}>
                  <Button variant="primary">Einträge anzeigen</Button>
                </Link>
              </Card.Body>
              <Card.Footer className="text-muted">Erstellt am: {protokoll.datum}</Card.Footer>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
}
