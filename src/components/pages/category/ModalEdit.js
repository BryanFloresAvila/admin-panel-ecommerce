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
    updateCategory(dataModal._id, data)
      .then((response) => {
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
      })
      .catch((error) => {
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
          <Form.Group className="mb-3">
            <Form.Label>Name Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              placeholder={dataModal.name}
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
