import React from "react";
import Card from "react-bootstrap/Card";
import { Container, Row } from "react-bootstrap";

const SensorCard = (props) => {
  return (
    <div>
      <Card style={{ margin: "10px" }}>
        <Container style={{ textAlign: "center" }}>
          <Row>
            <Card.Img
              className="mx-auto mt-2"
              src={props.imgName}
              style={{ height: "100px", width: "120px" }}
            />
          </Row>
          <Row>
            <Card.Body>
              <Card.Title>{props.sensorName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {props.sensorValue}
              </Card.Subtitle>
            </Card.Body>
          </Row>
        </Container>
      </Card>
    </div>
  );
};

SensorCard.defaultProps = {
  imgName: "thermometer.png",
  sensorName: "sensor name",
  sensorValue: "no value present",
};

export default SensorCard;
