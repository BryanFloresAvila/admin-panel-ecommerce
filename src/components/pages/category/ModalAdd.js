import React, { useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import sweetAlert from 'sweetalert2';
import { createCategory as serviceCreateCategory } from '../../../lib/api/services/categories';
import { configAddedError, configAdded } from '../../../utils/sl2/configs';
import { useCategoryStore } from '../../../store/index';
import { addCategory, addCategoryFail, addCategorySuccess } from '../../../store/actions/category/action';
export const ModalAdd = ({ show, handleClose, updateList, setUpdateList }) => {
  const { dispatch, StateCategories, StateCategory } = useCategoryStore();
  //const { category, loading: loadingCategory, error: errorCategory } = StateCategory;

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    let data = {
      name: e.target[0].value,
    };
    dispatch(addCategory());
    serviceCreateCategory(data)
      .then((response) => {
        if (response.status !== 200) sweetAlert.fire(configAddedError(data.name));
        return response.data;
      })
      .then((data) => {
        sweetAlert.fire(configAdded(data.name));
        dispatch(addCategorySuccess(data));
        handleClose();
        setUpdateList(!updateList);
      })
      .catch((error) => {
        dispatch(addCategoryFail(error.message));
        sweetAlert.fire(configAddedError(data.name));
      });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmitAdd}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name Category</Form.Label>
            <Form.Control type="text" name="category" placeholder="Name Category" required />
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
