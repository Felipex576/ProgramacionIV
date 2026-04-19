import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBoxOpen, FaTruck, FaUsers, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <div className="text-center mb-5">
        <h1 className="display-4">Bienvenido a MarketSoft</h1>
        <p className="lead">Panel del Sistema de Gestión de Supermercado</p>
      </div>
      
      <Row className="g-4">
        <Col md={6} lg={3}>
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <FaBoxOpen size={50} className="text-primary mb-3" />
              <Card.Title>Productos</Card.Title>
              <Card.Text>Gestiona el inventario, precios y niveles de stock.</Card.Text>
              <Link to="/products" className="btn btn-primary w-100">Ir a Productos</Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3}>
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <FaTruck size={50} className="text-success mb-3" />
              <Card.Title>Proveedores</Card.Title>
              <Card.Text>Gestiona la información de proveedores y contactos.</Card.Text>
              <Link to="/providers" className="btn btn-success w-100">Ir a Proveedores</Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3}>
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <FaUsers size={50} className="text-warning mb-3" />
              <Card.Title>Usuarios</Card.Title>
              <Card.Text>Gestiona el acceso de empleados y sus roles.</Card.Text>
              <Link to="/users" className="btn btn-warning w-100 text-white">Ir a Usuarios</Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <FaShoppingCart size={50} className="text-info mb-3" />
              <Card.Title>Ventas</Card.Title>
              <Card.Text>Registra y visualiza las transacciones de clientes.</Card.Text>
              <Link to="/sales" className="btn btn-info w-100 text-white">Ir a Ventas</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
