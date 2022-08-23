import React, { useEffect, useState } from 'react';
import sweetAlert from 'sweetalert2';
import { ModalEdit } from './ModalEdit';
import { ModalAdd } from './ModalAdd';
import { useModal } from '../../../hooks/useModal';
import {
  getProducts as serviceGetProducts,
  deleteProduct as serviceDeleteProduct,
} from '../../../lib/api/services/products';
import { Table, Button, ButtonToolbar, Container } from 'react-bootstrap';
import { StatsCard } from '../../StatsCard';
import { Loading } from '../../../components/Loading';
import { productTemplate } from '../../../utils/templateForm/templates';
import { useProductStore } from '../../../store/index';
import {
  getProducts,
  getProductsSuccess,
  getProductsFail,
  selectProduct,
  deleteProduct,
  deleteProductFail,
  deleteProductSuccess,
} from '../../../store/actions/product/action';
import { configDelete, configDeleted, configDeletedError } from '../../../utils/sl2/configs';

export const Product = () => {
  const { dispatch, StateProducts } = useProductStore();
  const { products, loading: loadingProducts, error: errorProducts } = StateProducts;
  const [updateList, setUpdateList] = useState(false);
  const modalAdd = useModal();
  const modalEdit = useModal(productTemplate);

  const handleDelete = (product) => {
    sweetAlert.fire(configDelete(product.name)).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct());
        serviceDeleteProduct(product._id)
          .then((response) => {
            if (response.status !== 200) sweetAlert.fire(configDeletedError(product.name));
            return response.data;
          })
          .then((data) => {
            dispatch(deleteProductSuccess(data));
            sweetAlert.fire(configDeleted(product.name));
            setUpdateList(!updateList);
          })
          .catch((error) => {
            dispatch(deleteProductFail(error.message));
            sweetAlert.fire(configDeletedError(product.name));
          });
      }
    });
  };

  useEffect(() => {
    dispatch(getProducts());
    serviceGetProducts()
      .then((response) => {
        if (response.status !== 200) return new Error('An error occurred');
        return response.data;
      })
      .then((data) => {
        console.log(data.data);
        dispatch(getProductsSuccess(data.data));
      })
      .catch((error) => {
        dispatch(getProductsFail(error.message));
      });
  }, [updateList, dispatch]);

  return (
    <Container>
      <div className="mt-2 row">
        <StatsCard variant="primary" title="Product" quantity={products.length}></StatsCard>
      </div>
      <div className="row py-3">
        <div className="col">
          <h2>Product List</h2>
        </div>
        <div className="col d-flex justify-content-end">
          <Button className="d-block" variant="primary" onClick={modalAdd.handleShow}>
            Add product
          </Button>
        </div>
      </div>
      <Table responsive striped hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <th className="align-middle" scope="row">
                {index + 1}
              </th>
              <td>
                <img src={`${process.env.REACT_APP_API_URL_PUBLIC}${product.image}`} width="100" />
              </td>
              <td className="align-middle">{product.name}</td>
              <td className="align-middle ">{product.description}</td>

              <td className="align-middle  ">{product.category?.name}</td>
              <td className="align-middle  ">{product.stock}</td>
              <td className="align-middle ">{product.price}</td>

              <td className="align-middle">
                <ButtonToolbar className="justify-content-center " style={{ height: '100%' }}>
                  <Button
                    className="m-1"
                    variant="danger"
                    style={{ width: '70px' }}
                    onClick={() => {
                      handleDelete(product);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    className="m-1"
                    variant="primary"
                    style={{ width: '70px' }}
                    onClick={() => {
                      dispatch(selectProduct(product));
                      modalEdit.handleShow(product);
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
      {loadingProducts && <Loading />}
    </Container>
  );
};
