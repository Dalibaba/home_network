import React from "react";
import Card from "react-bootstrap/Card";
import { Container, Row } from "react-bootstrap";

const SensorCard = (props) => {
  let imgName = props.sensorType + ".png";
  let unit = "";
  if (props.sensorType == "temperature") {
    unit = " °";
  } else if (props.sensorType == "humidity") {
    unit = " %";
  }

  return (
    <div>
      <Card style={{ margin: "10px" }}>
        <Container style={{ textAlign: "center" }}>
          <Row>
            <Card.Img
              className="mx-auto mt-2"
              src={imgName}
              style={{ height: "80px", width: "100px" }}
            />
          </Row>
          <Row>
            <Card.Body>
              <Card.Title>
                {props.sensorType} ({props.sensorId})
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {props.sensorValue} {unit}
              </Card.Subtitle>
            </Card.Body>
          </Row>
        </Container>
      </Card>
    </div>
  );
};

SensorCard.defaultProps = {
  sensorType: "type of sensor",
  sensorValue: "no value present",
  sensorId: "sensor Id",
};

export default SensorCard;
