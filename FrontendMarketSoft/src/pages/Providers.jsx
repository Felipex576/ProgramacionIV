import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import providerService from '../services/providerService';

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProvider, setCurrentProvider] = useState({ name: '', phone: '', email: '', city: '' });
  const [isEditing, setIsEditing] = useState(false);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const res = await providerService.getAll();
      setProviders(res.data || []);
    } catch (error) {
      toast.error('Error al obtener los proveedores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleShow = (provider = null) => {
    if (provider) {
      setCurrentProvider(provider);
      setIsEditing(true);
    } else {
      setCurrentProvider({ name: '', phone: '', email: '', city: '' });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProvider({ ...currentProvider, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await providerService.update(currentProvider.id, currentProvider);
        toast.success('Proveedor actualizado con éxito');
      } else {
        await providerService.create(currentProvider);
        toast.success('Proveedor creado con éxito');
      }
      handleClose();
      fetchProviders();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al guardar el proveedor');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
      try {
        await providerService.delete(id);
        toast.success('Proveedor eliminado con éxito');
        fetchProviders();
      } catch (error) {
        toast.error('Error al eliminar el proveedor. Podría estar vinculado a productos.');
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Proveedores</h2>
        <Button variant="primary" onClick={() => handleShow()}>
          <FaPlus className="me-2" /> Añadir Proveedor
        </Button>
      </div>

      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Ciudad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {providers.length === 0 ? (
              <tr><td colSpan="6" className="text-center">No se encontraron proveedores</td></tr>
            ) : (
              providers.map(provider => (
                <tr key={provider.id}>
                  <td>{provider.id}</td>
                  <td>{provider.name}</td>
                  <td>{provider.phone}</td>
                  <td>{provider.email}</td>
                  <td>{provider.city}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleShow(provider)}>
                      <FaEdit />
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(provider.id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? 'Editar Proveedor' : 'Añadir Proveedor'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="name" value={currentProvider.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="text" name="phone" value={currentProvider.phone || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" name="email" value={currentProvider.email || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control type="text" name="city" value={currentProvider.city || ''} onChange={handleChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Providers;
