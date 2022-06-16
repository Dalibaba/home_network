import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const SensorCard = (props) => {
  return (
    <div>
      <Card style={{ width: "25rem" }}>
        <Card.Img />

        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.value}
          </Card.Subtitle>
        </Card.Body>
      </Card>
      <Button>Button</Button>
    </div>
  );
};

SensorCard.defaultProps = {
  title: "sensor name",
  value: "value",
};

export default SensorCard;
