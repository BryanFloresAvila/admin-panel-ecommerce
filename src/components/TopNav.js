import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useUser} from '../context/UserContext';
export const TopNav = () => {
  const { isLogged  } = useUser();
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/Home">
            Admin Panel
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {
                isLogged ? (
                  <>
                    <Nav.Link as={Link} to="/Home">
                      Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Category">
                      Category
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Product">
                      Product
                    </Nav.Link>
                  </>
                ) : (
                  <>
                  </>)
              }
            </Nav>
            <Nav className="justify-content-end">
              {
                isLogged ? (
                  <Nav.Link as={Link} to="/Logout">Logout</Nav.Link>
                ) : (
                  <Nav.Link as={Link} to="/Login">Login</Nav.Link>
                )

              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
