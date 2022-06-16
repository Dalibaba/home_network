import Header from "./components/Header";
import SensorCard from "./components/SensorCard";
import NavBar from "./components/NavBar";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <div className="container">
      <Header />
      <NavBar />
      <Container
        style={{
          backgroundColor: "WhiteSmoke",
          marginTop: "10px",
        }}
      >
        <Row>
          <Col>
            <SensorCard />
          </Col>
          <Col>
            <SensorCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
