import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Spinner, Row, Col, Card } from 'react-bootstrap';
import { FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';
import saleService from '../services/saleService';
import userService from '../services/userService';
import productService from '../services/productService';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentSaleDetails, setCurrentSaleDetails] = useState(null);
  
  const [newSale, setNewSale] = useState({ userId: '', details: [] });
  const [currentDetail, setCurrentDetail] = useState({ productId: '', quantity: 1 });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [salesRes, usersRes, prodsRes] = await Promise.all([
        saleService.getAll(),
        userService.getAll(),
        productService.getAll()
      ]);
      setSales(salesRes.data || []);
      setUsers(usersRes.data || []);
      setProducts(prodsRes.data || []);
    } catch (error) {
      toast.error('Error al obtener los datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShowCreate = () => {
    setNewSale({ userId: users.length > 0 ? users[0].id : '', details: [] });
    setCurrentDetail({ productId: products.length > 0 ? products[0].id : '', quantity: 1 });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleAddDetail = () => {
    if (!currentDetail.productId || currentDetail.quantity <= 0) {
      toast.warning('Por favor seleccione un producto y una cantidad válida');
      return;
    }
    
    const productInfo = products.find(p => p.id === parseInt(currentDetail.productId));
    if (!productInfo) return;

    if (currentDetail.quantity > productInfo.stock) {
      toast.error(`Stock insuficiente. Disponible: ${productInfo.stock}`);
      return;
    }

    // Check if product is already in details
    const existingIndex = newSale.details.findIndex(d => d.productId === parseInt(currentDetail.productId));
    
    let updatedDetails = [...newSale.details];
    
    if (existingIndex >= 0) {
      updatedDetails[existingIndex].quantity += parseInt(currentDetail.quantity);
    } else {
      updatedDetails.push({
        productId: parseInt(currentDetail.productId),
        quantity: parseInt(currentDetail.quantity),
        productName: productInfo.name,
        price: productInfo.price
      });
    }

    setNewSale({ ...newSale, details: updatedDetails });
    setCurrentDetail({ ...currentDetail, quantity: 1 }); // reset quantity
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = newSale.details.filter((_, i) => i !== index);
    setNewSale({ ...newSale, details: updatedDetails });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newSale.userId) {
      toast.error('Por favor seleccione un usuario (cajero)');
      return;
    }
    if (newSale.details.length === 0) {
      toast.error('Por favor añada al menos un producto a la venta');
      return;
    }

    try {
      const payload = {
        userId: newSale.userId,
        details: newSale.details.map(d => ({ productId: d.productId, quantity: d.quantity }))
      };
      
      await saleService.create(payload);
      toast.success('Venta registrada con éxito');
      handleClose();
      fetchData(); // Refresh list to update stock as well
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al registrar la venta');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta venta? Esto restaurará el stock.')) {
      try {
        await saleService.delete(id);
        toast.success('Venta eliminada con éxito');
        fetchData();
      } catch (error) {
        toast.error('Error al eliminar la venta.');
      }
    }
  };

  const calculateTotalPreview = () => {
    return newSale.details.reduce((acc, curr) => acc + (parseFloat(curr.price) * curr.quantity), 0);
  };

  const handleViewDetails = async (saleId) => {
    try {
      const res = await saleService.getById(saleId);
      setCurrentSaleDetails(res.data);
      setShowDetailsModal(true);
    } catch (error) {
      toast.error('Error al obtener los detalles de la venta');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Ventas</h2>
        <Button variant="primary" onClick={handleShowCreate}>
          <FaPlus className="me-2" /> Registrar Venta
        </Button>
      </div>

      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Usuario (Cajero)</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sales.length === 0 ? (
              <tr><td colSpan="5" className="text-center">No se encontraron ventas</td></tr>
            ) : (
              sales.map(sale => (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{new Date(sale.date).toLocaleString()}</td>
                  <td>{sale.user?.name || sale.userId}</td>
                  <td>${parseFloat(sale.total).toFixed(2)}</td>
                  <td>
                    <Button variant="info" size="sm" className="me-2 text-white" onClick={() => handleViewDetails(sale.id)}>
                      <FaEye />
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(sale.id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Create Sale Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Registrar Nueva Venta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-4">
              <Form.Label>Cajero / Usuario</Form.Label>
              <Form.Select 
                value={newSale.userId} 
                onChange={(e) => setNewSale({...newSale, userId: e.target.value})} 
                required
              >
                <option value="">Seleccionar Usuario</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Card className="mb-4 bg-light">
              <Card.Body>
                <h5>Agregar Productos</h5>
                <Row className="align-items-end">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Producto</Form.Label>
                      <Form.Select 
                        value={currentDetail.productId} 
                        onChange={(e) => setCurrentDetail({...currentDetail, productId: e.target.value})}
                      >
                        <option value="">Seleccionar Producto</option>
                        {products.map(p => (
                          <option key={p.id} value={p.id} disabled={p.stock <= 0}>
                            {p.name} - ${parseFloat(p.price).toFixed(2)} (Stock: {p.stock})
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Cantidad</Form.Label>
                      <Form.Control 
                        type="number" 
                        min="1" 
                        value={currentDetail.quantity} 
                        onChange={(e) => setCurrentDetail({...currentDetail, quantity: parseInt(e.target.value)})} 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Button variant="secondary" className="w-100" onClick={handleAddDetail}>
                      Añadir Item
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <h5>Detalles de la Venta</h5>
            <Table size="sm" bordered>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {newSale.details.length === 0 ? (
                  <tr><td colSpan="5" className="text-center">No se han añadido items aún</td></tr>
                ) : (
                  newSale.details.map((item, index) => (
                    <tr key={index}>
                      <td>{item.productName}</td>
                      <td>${parseFloat(item.price).toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => handleRemoveDetail(index)}>
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="3" className="text-end">Total:</th>
                  <th colSpan="2">${calculateTotalPreview().toFixed(2)}</th>
                </tr>
              </tfoot>
            </Table>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
            <Button variant="primary" type="submit" disabled={newSale.details.length === 0}>Completar Venta</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* View Sale Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Venta #{currentSaleDetails?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentSaleDetails ? (
            <>
              <p><strong>Fecha:</strong> {new Date(currentSaleDetails.date).toLocaleString()}</p>
              <p><strong>Cajero:</strong> {currentSaleDetails.user?.name}</p>
              <Table size="sm" bordered>
                <thead className="table-light">
                  <tr>
                    <th>Producto</th>
                    <th>Cant</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSaleDetails.details?.map(detail => (
                    <tr key={detail.id}>
                      <td>{detail.product?.name || `Producto ID: ${detail.productId}`}</td>
                      <td>{detail.quantity}</td>
                      <td>${parseFloat(detail.price).toFixed(2)}</td>
                      <td>${(parseFloat(detail.price) * detail.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan="3" className="text-end">Total:</th>
                    <th>${parseFloat(currentSaleDetails.total).toFixed(2)}</th>
                  </tr>
                </tfoot>
              </Table>
            </>
          ) : (
            <Spinner animation="border" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Sales;
