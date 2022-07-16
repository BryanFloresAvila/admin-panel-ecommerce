import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import sweetAlert from 'sweetalert2';
import axios from 'axios';
export const ModalAdd = ({
  showModalAdd,
  handleCloseModalAdd,
  updateList,
  setUpdateList,
}) => {
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    const URL =
      'https://backend-project-pam-production.up.railway.app/api/v1/categories/create';
    const data = {
      name: e.target[0].value,
    };
    const response = await axios.post(URL, data);
    if (response.status === 200) {
      setUpdateList(!updateList);
      handleCloseModalAdd();
      sweetAlert.fire(
        'Saved!',
        `The register ${response.data.reference} has been saved correctly !`,
        'success'
      );
    } else {
      sweetAlert.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
      });
    }
  };
  return (
    <Modal show={showModalAdd} onHide={handleCloseModalAdd}>
      <Modal.Header>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmitAdd}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              //value={dataModal.name}
              placeholder="Name Category"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="reset" onClick={handleCloseModalAdd}>
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
