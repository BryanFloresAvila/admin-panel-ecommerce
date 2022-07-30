import { Button, Modal, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import sweetAlert from 'sweetalert2';
import { updateProduct } from '../../../lib/api/services/products';
import { getCategories } from '../../../lib/api/services/categories';
export const ModalEdit = ({
  updateList,
  setUpdateList,
  dataModal,
  handleCloseModal,
  showModal,
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);

    const data = {
      name: e.target[0].value,
      description: e.target[1].value,
      category: e.target[2].value,
      stock: e.target[3].value,
      price: e.target[4].value,
      image: e.target[5].files[0],
    };
    console.log(data);
    updateProduct(dataModal._id, data)
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

  useEffect(() => {
    getCategories().then(({ data }) => {
      const { data: categories } = data;
      setLoading(false);
      setCategories(categories);
    });
  }, []);

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>Change Data</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-1">
            <Form.Label>Name Product</Form.Label>
            <Form.Control type="text" name="name" placeholder={dataModal.name} required />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder={dataModal.description}
              required
            />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Name Category</Form.Label>
            <Form.Select>
              <option value={dataModal.category?._id}>{dataModal.category?.name}</option>
              {categories.map((category) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" name="stock" placeholder={dataModal.stock} />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" placeholder={dataModal.price} />
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
