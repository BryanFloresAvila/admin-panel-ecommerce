import React, { useEffect, useState } from 'react';
import { getCategories } from '../../helpers/getCategories';
import { Table, Button, ButtonToolbar, Modal, Form } from 'react-bootstrap';
import sweetAlert from 'sweetalert2';
import axios from 'axios';
export const Category = () => {
  const [updateList, setUpdateList] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleChangeModal = ({ target }) => {
    console.log(target);
  };

  const handleDelete = (category) => {
    const URL = 'https://backend-project-pam-production.up.railway.app/api/v1/categories';
    sweetAlert
      .fire({
        title: `Are you sure to delete ${category.name} ?`,
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes, Delete!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${URL}/${category._id}`).then((response) => {
            if (response.status === 200) {
              sweetAlert.fire(
                'Deleted!',
                `Registration successfully deleted ${category.name}!`,
                'success'
              );
              setUpdateList(!updateList);
            } else {
              sweetAlert.fire(
                'Error!',
                'There was a problem with deleting the record!',
                'error'
              );
            }
          });
        }
      });
  };

  const handleEdit = async (category) => {};

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data.data.data);
    });
  }, [updateList]);
  return (
    <div className="container px-5">
      <Table striped hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{category.name}</td>
              <td>
                <ButtonToolbar>
                  <Button
                    variant="danger"
                    className="me-3"
                    onClick={() => {
                      handleDelete(category);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setDataModal(category);
                      handleShowModal();
                    }}
                  >
                    Edit
                  </Button>
                </ButtonToolbar>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>Change Data</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name Category</Form.Label>
              <Form.Control
                type="email"
                name="reference"
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
    </div>
  );
};
