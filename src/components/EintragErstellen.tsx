import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { createEintrag, id } from '../backend/api'; 
import { useLoginContext } from './LoginManager';
import { LinkContainer } from 'react-router-bootstrap';
import { EintragResource } from '../Resources';
import { log } from 'console';

export default function EintragErstellen() {
 
  const navigate = useNavigate();
  const { protokollId } = useParams();
  const { loginInfo } = useLoginContext();
  const [getraenk, setGetraenk] = useState('');
  const [menge, setMenge] = useState<number>();
  const [kommentar, setKommentar] = useState('');
  const [getMyUpdatedEintrag, setMyEintrag] = useState<EintragResource>({
        getraenk:"",
        menge: 0 ,
        kommentar: "",
        ersteller:id,
        protokoll: protokollId!,
  })



  function update(e: ChangeEvent<HTMLInputElement>){
    return setMyEintrag({...getMyUpdatedEintrag, [e.target.name]: e.target.value})
  }



async function eintragErstellen1() {
    let e:any;
    let EintragDaten: EintragResource;
  
    try {
      await createEintrag(getMyUpdatedEintrag);
    } catch (error) {
      console.error('Fehler beim Erstellen des Eintrags', error);
    }
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <Form onSubmit={() => eintragErstellen1()}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Getränk</Form.Label>
            <Form.Control type="text" name="getraenk" placeholder="Name des Getränks" value={getMyUpdatedEintrag.getraenk} onChange={update} />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Menge</Form.Label>
            <Form.Control type="text" name="menge" placeholder="Menge in ml" value={getMyUpdatedEintrag.menge} onChange={update} />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Kommentar</Form.Label>
            <Form.Control type="text" name="kommentar" placeholder="Kommentar" value={getMyUpdatedEintrag.kommentar} onChange={update} />
          </Form.Group>
        </Row>

        <Button variant="secondary" type="button" onClick={() => navigate('/')}>
          Abbrechen
        </Button>
        <LinkContainer to={`/protokoll/${protokollId}`}>
        <Button variant="primary" type="submit" onClick={() => eintragErstellen1()}>
          Speichern
        </Button>
      </LinkContainer>
      </Form>

    </div>
  )};

