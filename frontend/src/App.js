import Header from "./components/Header";
import SensorCard from "./components/SensorCard";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { SENSOR_ROUTE } from "./constants";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(SENSOR_ROUTE);
        setData(response.data);
        setError(null);
        console.log(response.data[0].room);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="container">
      <Header />
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {data && (
        <Container
          style={{
            backgroundColor: "WhiteSmoke",
            marginTop: "10px",
            width: "80%",
          }}
        >
          <Row>
            <h1>{data[0].room}</h1>
          </Row>

          <Row>
            <Col>
              <SensorCard
                img_name="thermometer.png"
                sensor_name="Temperature"
              />
            </Col>
            <Col>
              <SensorCard img_name="humidity.png" sensor_name="Humidity" />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default App;
