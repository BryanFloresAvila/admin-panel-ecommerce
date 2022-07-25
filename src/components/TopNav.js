import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/context/authContext';
import { logout } from '../store/actions/actions';
export const TopNav = () => {
  const { state, dispatch } = useAuth();
  const { isLogged, user } = state;
  const handleLogout = (e) => {
    e.preventDefault();
    logout(dispatch);
  };

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
              {isLogged ? (
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
                <></>
              )}
            </Nav>
            <Nav className="justify-content-end">
              {isLogged ? (
                <NavDropdown title={user.name} menuVariant="dark">
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/Login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
