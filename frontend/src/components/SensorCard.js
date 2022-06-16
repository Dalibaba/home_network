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
              src={props.img_name}
              style={{ height: "100px", width: "120px" }}
            />
          </Row>
          <Row>
            <Card.Body>
              <Card.Title>{props.sensor_name}</Card.Title>
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
  img_name: "thermometer.png",
  sensor_name: "sensor name",
  value: "value",
};

export default SensorCard;
