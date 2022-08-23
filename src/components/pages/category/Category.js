import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Table, Button, ButtonToolbar, Container } from 'react-bootstrap';
import sweetAlert from 'sweetalert2';
import { ModalEdit } from './ModalEdit';
import { ModalAdd } from './ModalAdd';
import { useModal } from '../../../hooks/useModal';
import {
  deleteCategory as serviceDeleteCategory,
  getCategories as serviceGetCategories,
} from '../../../lib/api/services/categories';
import { StatsCard } from '../../StatsCard';
import { useCategoryStore } from '../../../store/index';
import {
  getCategories,
  getCategoriesSuccess,
  getCategoriesFail,
  selectCategory,
  deleteCategory,
  deleteCategoryFail,
} from '../../../store/actions/category/action';
import { categoryTemplate } from '../../../utils/templateForm/templates';
import { configDelete, configDeleted, configDeletedError } from '../../../utils/sl2/configs';

export const Category = () => {
  console.log('Category has been rendered');
  const { dispatch, StateCategories } = useCategoryStore();
  const { categories, loading: loadingCategories } = StateCategories;
  const [updateList, setUpdateList] = useState(false);
  // hooks to handle modal
  const modalAdd = useModal();
  const modalEdit = useModal(categoryTemplate);
  const handleDelete = (category) => {
    sweetAlert.fire(configDelete(category.name)).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory());
        serviceDeleteCategory(category._id)
          .then((response) => {
            if (response.status !== 200) sweetAlert.fire(configDeletedError(category.name));
            return response.data;
          })
          .then((data) => {
            dispatch(deleteCategory());
            sweetAlert.fire(configDeleted(category.name));
            setUpdateList(!updateList);
          })
          .catch((error) => {
            dispatch(deleteCategoryFail(error.message));
            sweetAlert.fire(configDeletedError(category.name));
          });
      }
    });
  };

  useEffect(() => {
    dispatch(getCategories());
    serviceGetCategories()
      .then((response) => {
        if (response.status !== 200) return new Error('An error occurred');
        return response.data;
      })
      .then((data) => {
        dispatch(getCategoriesSuccess(data.data));
      })
      .catch((error) => {
        dispatch(getCategoriesFail(error.message));
      });
  }, [updateList, dispatch]);
  return (
    <Container className="ct">
      <div className="mt-2 row">
        <StatsCard variant="primary" title="Category" quantity={categories.length}></StatsCard>
      </div>
      <div className="row py-3">
        <div className="col">
          <h2>Category List</h2>
        </div>
        <div className="col d-flex justify-content-end">
          <Button className="d-block" variant="primary" onClick={modalAdd.handleShow}>
            Add Category
          </Button>
        </div>
      </div>
      <Table striped hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th className="text-center">Name</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id}>
              <th scope="row">{loadingCategories ? <Skeleton /> : index + 1}</th>
              <td className="text-center">{loadingCategories ? <Skeleton /> : category.name}</td>
              <td>
                {loadingCategories ? (
                  <Skeleton />
                ) : (
                  <ButtonToolbar className="justify-content-end">
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
                        dispatch(selectCategory(category));
                        modalEdit.handleShow(category);
                      }}
                    >
                      Edit
                    </Button>
                  </ButtonToolbar>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalEdit
        show={modalEdit.show}
        handleClose={modalEdit.handleClose}
        updateList={updateList}
        data={modalEdit.data}
        handleChange={modalEdit.handleChange}
        setUpdateList={setUpdateList}
      />
      <ModalAdd
        show={modalAdd.show}
        handleClose={modalAdd.handleClose}
        updateList={updateList}
        setUpdateList={setUpdateList}
      />
    </Container>
  );
};
