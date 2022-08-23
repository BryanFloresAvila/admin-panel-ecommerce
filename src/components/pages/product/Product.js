import React, { useEffect, useState } from 'react';
import sweetAlert from 'sweetalert2';
import { ModalEdit } from './ModalEdit';
import { ModalAdd } from './ModalAdd';
import { useModal } from '../../../hooks/useModal';
import { getProducts } from '../../../lib/api/services/products';
import { Table, Button, ButtonToolbar, Container } from 'react-bootstrap';
import { StatsCard } from '../../StatsCard';
import { Loading } from '../../../components/Loading';
import { productTemplate } from '../../../utils/templateForm/templates';
import { deleteProduct } from '../../../lib/api/services/products';
export const Product = () => {
  const [product, setProduct] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataModal, setDataModal] = useState({});
  const modalAdd = useModal();
  const modalEdit = useModal(productTemplate);

  const handleDelete = (product) => {
    sweetAlert
      .fire({
        title: `Are you sure to delete ${product.name} ?`,
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
          deleteProduct(product._id).then((response) => {
            if (response.status === 200) {
              sweetAlert.fire({
                title: 'Deleted!',
                text: `Registration successfully deleted ${product.name}!`,
                icon: 'success',
                heightAuto: false,
              });
              setUpdateList(!updateList);
            } else {
              sweetAlert.fire({
                title: 'Error!',
                text: 'There was a problem with deleting the record!',
                icon: 'error',
                heightAuto: false,
              });
            }
          });
        }
      });
  };

  useEffect(() => {
    getProducts().then((response) => {
      const { data } = response;
      setLoading(false);
      setProduct(data.data);
    });
  }, [updateList]);
  return (
    <Container>
      <div className="mt-2 row">
        <StatsCard variant="primary" title="Product" quantity={product.length}></StatsCard>
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
          {product.map((item, index) => (
            <tr key={item._id}>
              <th className="align-middle" scope="row">
                {index + 1}
              </th>
              <td>
                <img src={`${process.env.REACT_APP_API_URL_PUBLIC}${item.image}`} width="100" />
              </td>
              <td className="align-middle">{item.name}</td>
              <td className="align-middle ">{item.description}</td>

              <td className="align-middle  ">{item.category?.name}</td>
              <td className="align-middle  ">{item.stock}</td>
              <td className="align-middle ">{item.price}</td>

              <td className="align-middle">
                <ButtonToolbar className="justify-content-center " style={{ height: '100%' }}>
                  <Button
                    className="m-1"
                    variant="danger"
                    style={{ width: '70px' }}
                    onClick={() => {
                      handleDelete(item);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    className="m-1"
                    variant="primary"
                    style={{ width: '70px' }}
                    onClick={() => {
                      setDataModal(item);
                      modalEdit.handleShow();
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
        dataModal={dataModal}
        updateList={modalEdit.updateList}
        setUpdateList={setUpdateList}
      />
      <ModalAdd
        show={modalAdd.show}
        handleClose={modalAdd.handleClose}
        updateList={updateList}
        setUpdateList={setUpdateList}
      />
      {loading && <Loading />}
    </Container>
  );
};
