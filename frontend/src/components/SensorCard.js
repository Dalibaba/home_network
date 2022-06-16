import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const SensorCard = (props) => {
  return (
    <div>
      <Card style={{ width: "25rem" }}>
        <Card.Img
          src="thermometer.png"
          style={{ height: "100px", width: "100px" }}
        />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.value}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  );
};

SensorCard.defaultProps = {
  title: "sensor name",
  value: "value",
};

export default SensorCard;
