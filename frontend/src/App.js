import Header from "./components/Header";
import SensorCard from "./components/SensorCard";
import Spinner from "./components/Spinner";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { SENSOR_ROUTE, TEMPERATURE_ROUTE, HUMIDITY_ROUTE } from "./constants";
import { Sensor } from "./models/Sensor";
import { Room } from "./models/Room";

function App() {
  const [roomList, setRoomList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSensorValue = async (route, sensor_id) => {
      const response = await axios.get(route, {
        params: { id: sensor_id, latest: "true" },
      });
      console.log(response);
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
              let response_value = await getSensorValue(
                TEMPERATURE_ROUTE,
                response.data[index].id
              );
              console.log(response_value.data[0].value);
              sensorList.push(
                new Sensor(
                  response.data[index].device,
                  response.data[index].sensor_id,
                  response.data[index].type,
                  response_value.data[0].value
                )
              );
              console.log(sensorList);
            }
          }
          let new_room = new Room(room_set, sensorList);
          roomListTemp.push(new_room);
        }
        console.log(roomListTemp);
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
  }, []);

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
        <div>
          {roomList.map((room, index) => (
            <Container
              key={index}
              style={{
                backgroundColor: "WhiteSmoke",
                marginTop: "10px",
                width: "80%",
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
                      sensor_name={sensor.type}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
