import { Button, Modal, Form } from 'react-bootstrap';
import React from 'react';
import axios from 'axios';
import sweetAlert from 'sweetalert2';

export const ModalEdit = ({
  updateList,
  setUpdateList,
  dataModal,
  handleCloseModal,
  showModal,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = 'https://backend-project-pam-production.up.railway.app/api/v1/categories';
    const data = {
      name: e.target[0].value,
    };
    const response = await axios.put(`${URL}/${dataModal._id}`, data);

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
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>Change Data</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              //value={dataModal.name}
              placeholder="Name Category"
              //onChange={handleChangeModal}
              required
            />
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
