import Header from "./components/Header";
import SensorCard from "./components/SensorCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <div className="container">
      <Header />
      <Container>
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
