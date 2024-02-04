import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createProtokoll, id } from '../backend/api';
import { useLoginContext } from './LoginManager';
import { LinkContainer } from 'react-router-bootstrap';

export default function ProtokollErstellen() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [datum, setDatum] = useState('');
  const { loginInfo } = useLoginContext();

let e : any ;

  async function protokollErstellen() {
    
if (loginInfo) {
  e = loginInfo.userId;
}
    const protokollDaten = {
      patient,
      public: isPublic,
      closed: isClosed,
      datum,
      ersteller: e!,

    };
    console.log( "id = "  + e!)
    try {
      await createProtokoll(protokollDaten);

    } catch (error) {
      console.error('Fehler beim Erstellen des Protokolls', error);
    }
  }

  return (
    <div style={{ marginTop: "5rem" }}>
      <Form onSubmit={protokollErstellen}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Patient</Form.Label>
            <Form.Control type="text" placeholder="Name des Patienten" value={patient} onChange={e => setPatient(e.target.value)} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPublic">
            <Form.Label>Public</Form.Label>
            <Form.Check type="checkbox" label="Ja" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridClosed">
            <Form.Label>Closed</Form.Label>
            <Form.Check type="checkbox" label="Ja" checked={isClosed} onChange={e => setIsClosed(e.target.checked)} />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Datum</Form.Label>
          <Form.Control type="date" value={datum} onChange={e => setDatum(e.target.value)} />
        </Form.Group>

        <Button variant="secondary" type="button" onClick={() => navigate('/')}>
          Abbrechen
        </Button>
        <LinkContainer to = "/">
        <Button variant="primary" type="submit" onClick={protokollErstellen}>
        Erstellen
        </Button>
        </LinkContainer>
      </Form>
    </div>
  );
}