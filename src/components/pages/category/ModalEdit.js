import { Button, Modal, Form } from 'react-bootstrap';
import React from 'react';
import sweetAlert from 'sweetalert2';
import { useCategoryStore } from '../../../store/index';
import { updateCategory as serviceUpdateCategory } from '../../../lib/api/services/categories';
import { configUpdatedError, configUpdate, configUpdated } from '../../../utils/sl2/configs';
import { updateCategory, updateCategoryFail, updateCategorySuccess } from '../../../store/actions/category/action';
export const ModalEdit = ({ updateList, setUpdateList, handleClose, show, data, handleChange }) => {
  const { dispatch, StateCategory } = useCategoryStore();
  const { category } = StateCategory;
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: e.target[0].value,
    };
    sweetAlert.fire(configUpdate(category.name)).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateCategory());
        serviceUpdateCategory(category._id, data)
          .then((response) => {
            if (response.status !== 200) sweetAlert.fire(configUpdatedError(category.name));
            return response.data;
          })
          .then(() => {
            dispatch(updateCategorySuccess());
            sweetAlert.fire(configUpdated(category.name));
            handleClose();
            setUpdateList(!updateList);
          })
          .catch((error) => {
            dispatch(updateCategoryFail(error.message));
            sweetAlert.fire(configUpdatedError(category.name));
          });
      }
    });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Change Data</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name Category</Form.Label>
            <Form.Control type="text" name="name" value={data.name} onChange={handleChange} required />
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
