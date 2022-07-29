import { Button, Modal, Form } from 'react-bootstrap';
import React from 'react';
import sweetAlert from 'sweetalert2';
import { updateCategory } from '../../../lib/api/services/categories';
export const ModalEdit = ({
  updateList,
  setUpdateList,
  dataModal,
  handleCloseModal,
  showModal,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target[0].value,
    };
    updateCategory(dataModal._id, data).then((response) => {
      if (response.status === 200) {
        setUpdateList(!updateList);
        handleCloseModal();
      } else {
        sweetAlert.fire({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    }).catch((error) => {
      sweetAlert.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    });
    
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>Change Data</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-1">
            <Form.Label>Name Product</Form.Label>
            <Form.Control
              type="text"
              name="category"
              //value={dataModal.name}
              placeholder="Name Product"
              //onChange={handleChangeModal}
              required
            />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="category"
              //value={dataModal.name}
              placeholder="Description"
              //onChange={handleChangeModal}
              required
            />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Name Category</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" name="stock" placeholder="Stock" /> 
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" placeholder="Price" /> 
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-1">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" type="reset" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="success" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
