import React, { useEffect, useState } from 'react';
import { getCategories } from '../../helpers/getCategories';
import { Table, Button, ButtonToolbar, Modal, Form } from 'react-bootstrap';
import sweetAlert from 'sweetalert2';
import axios from 'axios';
export const Category = () => {
  const [updateList, setUpdateList] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleShowModalAdd = () => setShowModalAdd(true);
  const handleCloseModalAdd = () => setShowModalAdd(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = 'https://backend-project-pam-production.up.railway.app/api/v1/categories'
    const data = {
      name : e.target[0].value,
    };
    const response = await axios.put(`${URL}/${dataModal._id}`, data);

    if (response.status === 200) {
      setUpdateList(!updateList);
      handleCloseModal();
    }
    else {
      sweetAlert.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    const URL = 'https://backend-project-pam-production.up.railway.app/api/v1/categories/create'
    const data = {
      name : e.target[0].value,
    };
    const response = await axios.post(URL, data);
    if(response.status === 200) {
      setUpdateList(!updateList);
      handleCloseModalAdd();
      sweetAlert.fire(
        'Saved!',
        `The register ${response.data.reference} has been saved correctly !`,
        'success'
    )
      }else{
      sweetAlert.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error'
    })
    }
  }




  const handleChangeModal = ({ target }) => {
    console.log(target.value);
    return target.value;
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
  

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data.data.data);
    });
  }, [updateList]);
  return (
    <div className="container px-5">
      <div className="row py-3">
        <div className='col'>
          <h2>Category List</h2>
        </div>
        <div className='col'>
          <Button className='d-block mx-auto' variant="primary" onClick={handleShowModalAdd}> Add Category</Button>
        </div>
      </div>
      <Table striped hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th className='text-center'>Name</th>
            <th className='text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td className='text-center'>{category.name}</td>
              <td>
                <ButtonToolbar className='justify-content-center'>
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
                type="text"
                name="category"
                //value={dataModal.name}
                placeholder="Name Category"
                onChange={handleChangeModal}
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
    </div>
  );
};
