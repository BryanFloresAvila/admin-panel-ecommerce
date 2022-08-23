import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import sweetAlert from 'sweetalert2';
import { configAddedError, configAdded } from '../../../utils/sl2/configs';
import { createProduct as serviceCreateProduct } from '../../../lib/api/services/products';
import { useCategoryStore, useProductStore } from '../../../store/index';
import { addProduct, addProductFail, addProductSuccess } from '../../../store/actions/product/action';
export const ModalAdd = ({ show, handleClose, updateList, setUpdateList }) => {
  const { dispatch, StateProduct } = useProductStore();
  const { StateCategories } = useCategoryStore();
  const { categories, error: errorCategories } = StateCategories;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target[0].value,
      description: e.target[1].value,
      category: e.target[2].value,
      stock: e.target[3].value,
      price: e.target[4].value,
      image: e.target[5].files[0],
    };
    dispatch(addProduct());
    serviceCreateProduct(data)
      .then((response) => {
        if (response.status !== 200) sweetAlert.fire(configAddedError(data.name));
        return response.data;
      })
      .then(() => {
        sweetAlert.fire(configAdded(data.name));
        dispatch(addProductSuccess());
        handleClose();
        setUpdateList(!updateList);
      })
      .catch((error) => {
        dispatch(addProductFail(error.message));
        sweetAlert.fire(configAddedError(data.name));
      });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Change Data</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
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
            <Form.Select name="category">
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
          <Button variant="secondary" type="reset" onClick={handleClose}>
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
