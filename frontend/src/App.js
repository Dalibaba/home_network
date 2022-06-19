import Header from "./components/Header";
import SensorCard from "./components/SensorCard";
import Spinner from "./components/Spinner";
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
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 750);
      }
    };
    getData();
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
      {data && !loading && (
        <Container
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
              <h1>{data[0].room}</h1>
            </Col>
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
