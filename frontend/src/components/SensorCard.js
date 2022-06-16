import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";

const SensorCard = (props) => {
  return (
    <div>
      <Card style={{ width: "25rem", margin: "10px" }}>
        <Container style={{ textAlign: "center" }}>
          <Row>
            <Card.Img
              className="mx-auto mt-2"
              src="thermometer.png"
              style={{ height: "100px", width: "120px" }}
            />
          </Row>
          <Row>
            <Card.Body>
              <Card.Title>{props.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {props.value}
              </Card.Subtitle>
            </Card.Body>
          </Row>
        </Container>
      </Card>
    </div>
  );
};

SensorCard.defaultProps = {
  title: "sensor name",
  value: "value",
};

export default SensorCard;
