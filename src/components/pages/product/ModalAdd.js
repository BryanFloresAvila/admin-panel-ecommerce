import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import sweetAlert from 'sweetalert2';
import { createCategory } from '../../../lib/api/services/categories';
import { createProduct } from '../../../lib/api/services/products';
import { getCategories } from '../../../lib/api/services/categories';
export const ModalAdd = ({
  showModalAdd,
  handleCloseModalAdd,
  updateList,
  setUpdateList,
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target[0].value,
      description: e.target[1].value,
      category: e.target[2].value,
      stock: e.target[3].value,
      price: e.target[4].value,
      image: e.target[5].files[0],
    };
    createProduct(data)
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

  useEffect(() => {
    getCategories().then(({ data }) => {
      const { data: categories } = data;
      setLoading(false);
      setCategories(categories);
    });
  }, []);

  return (
    <Modal show={showModalAdd} onHide={handleCloseModalAdd}>
      <Modal.Header>
        <Modal.Title>Change Data</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmitAdd}>
        <Modal.Body>
          <Form.Group className="mb-1">
            <Form.Label>Name Product</Form.Label>
            <Form.Control type="text" name="name" required />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" required />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Name Category</Form.Label>
            <Form.Select>
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
            <Form.Control type="number" name="stock" />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-1">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" />
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
