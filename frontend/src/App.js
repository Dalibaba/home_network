import Header from "./components/Header";
import SensorCard from "./components/SensorCard";
import Spinner from "./components/Spinner";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { SENSOR_ROUTE, API_URL } from "./constants";
import { Sensor } from "./models/Sensor";
import { Room } from "./models/Room";

function App() {
  const [roomList, setRoomList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSensorValue = async (route, sensor_id) => {
      const response = await axios.get(API_URL + route, {
        params: { id: sensor_id, latest: "true" },
      });
      return response;
    };
    const getSensors = async () => {
      try {
        let roomListTemp = [];
        let roomListSet = new Set();
        const response = await axios.get(SENSOR_ROUTE);
        //setSensor(response.data);
        // get all individuval rooms
        for (let index = 0; index < response.data.length; index++) {
          roomListSet.add(response.data[index].room);
        }
        // create room list
        for (const room_set of roomListSet) {
          //roomListSet.forEach( await (room_set) => {
          let sensorList = [];

          for (let index = 0; index < response.data.length; index++) {
            if (response.data[index].room == room_set) {
              let value = "no value";
              let response_value = await getSensorValue(
                response.data[index].type,
                response.data[index].id
              );
              if (response_value.data.length != 0) {
                value = response_value.data[0].value;
              }
              sensorList.push(
                new Sensor(
                  response.data[index].device,
                  response.data[index].sensor_id,
                  response.data[index].type,
                  value
                )
              );
            }
          }
          let new_room = new Room(room_set, sensorList);
          roomListTemp.push(new_room);
        }
        setRoomList(roomListTemp);
        setError(null);
      } catch (err) {
        setError(err.message);
        setRoomList(null);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 750);
      }
    };
    getSensors();
  }, [loading]);

  const handleClick = (e) => {
    setLoading(true);
  };
  return (
    <div className="container">
      <Header />
      {loading && (
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "150px",
            justifyContent: "center",
          }}
        >
          <Spinner />
        </Container>
      )}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {roomList && !loading && (
        <Container
          style={{
            backgroundColor: "Gainsboro",
            marginTop: "10px",
            width: "90%",
          }}
        >
          <Row>
            <Col>
              <Button variant="danger" onClick={handleClick}>
                Refresh
              </Button>
            </Col>
          </Row>
          {roomList.map((room, index) => (
            <Container
              key={index}
              style={{
                marginTop: "20px",
                width: "80%",
                backgroundColor: "whitesmoke",
              }}
            >
              <Row>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "25px",
                    justifyContent: "center",
                  }}
                >
                  <h1>{room.name}</h1>
                </Col>
              </Row>

              <Row>
                {room.sensorList.map((sensor, index) => (
                  <Col key={index}>
                    <SensorCard
                      img_name="thermometer.png"
                      sensorName={sensor.type}
                      sensorValue={sensor.value}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          ))}
        </Container>
      )}
    </div>
  );
}

export default App;
