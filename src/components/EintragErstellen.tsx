import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { createEintrag, id } from "../backend/api";
import { useLoginContext } from "./LoginManager";
import { LinkContainer } from "react-router-bootstrap";
import { EintragResource } from "../Resources";
import { log } from "console";
import { Eintrag } from "./Eintrag";

export default function EintragErstellen() {
  const navigate = useNavigate();
  const { protokollId } = useParams();
  const { loginInfo } = useLoginContext();
  const [getraenk, setGetraenk] = useState("");
  const [menge, setMenge] = useState<number>();
  const [kommentar, setKommentar] = useState("");
  const [getraenkError, setGetraenkError] = useState("");
  const [mengeError, setMengeError] = useState("");
  const [kommentarError, setKommentarError] = useState("");

  const [getMyUpdatedEintrag, setMyEintrag] = useState<EintragResource>({
    getraenk: "",
    menge: 0,
    kommentar: "",
    ersteller: id,
    protokoll: protokollId!,
  });

  const handleGetraenkChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let intValue = name === "menge" ? parseInt(value, 10) : 0;

    setMyEintrag((prevState) => ({
      ...prevState,
      [name]: name === "menge" ? intValue : value,
    }));

    if (name === "getraenk") {
      setGetraenkError(
        value.length < 3 || value.length > 100
          ? "Das Getränk muss mindestens 3 und maximal 100 Buchstaben lang sein."
          : ""
      );
    } else if (name === "menge") {
      setMengeError(
        !isNaN(intValue) && (intValue < 0 || intValue > 10000)
          ? "Die Menge muss zwischen 0 und 10000 liegen."
          : ""
      );
    } else if (name === "kommentar") {
      setKommentarError(
        value.length > 0 && value.length < 3
          ? "Der Kommentar muss mindestens 3 Zeichen lang sein."
          : ""
      );
    }
  };

  async function eintragErstellen1() {

    try {
      await createEintrag(getMyUpdatedEintrag);
    } catch (error) {
      console.error("Fehler beim Erstellen des Eintrags:", error);
    }
  }

  return (
    <div style={{ marginTop: "5rem" }}>
      <Form onSubmit={eintragErstellen1}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Getränk</Form.Label>
            <Form.Control
              type="text"
              name="getraenk"
              placeholder="Name des Getränks"
              value={getMyUpdatedEintrag.getraenk}
              onChange={handleGetraenkChange}
              isInvalid={!!getraenkError}
              minLength={3}
              maxLength={100}
            />
            <Form.Control.Feedback type="invalid">
              {getraenkError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Menge</Form.Label>
            <Form.Control
              type="text"
              name="menge"
              placeholder="Menge in ml"
              value={getMyUpdatedEintrag.menge.toString()}
              onChange={handleGetraenkChange}
              isInvalid={!!mengeError}
              minLength={0}
              maxLength={10000}
            />
            <Form.Control.Feedback type="invalid">
              {mengeError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Kommentar</Form.Label>
            <Form.Control
              type="text"
              name="kommentar"
              placeholder="Kommentar"
              value={getMyUpdatedEintrag.kommentar}
              onChange={handleGetraenkChange}
              minLength={3}
            />
            <Form.Control.Feedback type="invalid">
              {kommentarError}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button variant="secondary" type="button" onClick={() => navigate("/")}>
          Abbrechen
        </Button>
        <LinkContainer to = {`/protokoll/${protokollId}`}>
        <Button variant="primary" type="submit" onClick={eintragErstellen1}>
          Speichern
        </Button>
        </LinkContainer>
      </Form>
    </div>
  );
}
