import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import sweetAlert from 'sweetalert2';
import { createCategory } from '../../../lib/api/services/categories';

export const ModalAdd = ({
  showModalAdd,
  handleCloseModalAdd,
  updateList,
  setUpdateList,
}) => {
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target[0].value,
    };
    console.log(data);
    createCategory(JSON.parse(JSON.stringify(data)))
      .then((response) => {
        if (response.status === 200) {
          setUpdateList(!updateList);
          sweetAlert
            .fire(
              'Saved!',
              `The register ${response.data.reference} has been saved correctly !`,
              'success'
            )
            .then((response) => {
              if (response.isConfirmed) {
                handleCloseModalAdd();
              }
            });
        } else {
          sweetAlert.fire({
            title: 'Error',
            text: 'Something went wrong',
            icon: 'error',
          });
        }
      })
      .catch((error) => {
        console.log(error);
        sweetAlert.fire({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error',
        });
      });
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
