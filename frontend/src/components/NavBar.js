import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <>
      <br />
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/sensors">Sensors</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
