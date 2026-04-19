import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaStore, FaBoxOpen, FaTruck, FaUsers, FaShoppingCart } from 'react-icons/fa';

const Layout = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <FaStore className="me-2" />
            MarketSoft
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/products">
                <FaBoxOpen className="me-1" /> Productos
              </Nav.Link>
              <Nav.Link as={NavLink} to="/providers">
                <FaTruck className="me-1" /> Proveedores
              </Nav.Link>
              <Nav.Link as={NavLink} to="/users">
                <FaUsers className="me-1" /> Usuarios
              </Nav.Link>
              <Nav.Link as={NavLink} to="/sales">
                <FaShoppingCart className="me-1" /> Ventas
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className="container mt-4 mb-5">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
