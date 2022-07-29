import React, { useEffect, useState } from 'react';
import sweetAlert from 'sweetalert2';
import { ModalEdit } from './ModalEdit';
import { ModalAdd } from './ModalAdd';
import { useModal } from '../../../hooks/useModal';
import { getProducts } from '../../../lib/api/services/products';
import { Table, Button, ButtonToolbar, Container } from 'react-bootstrap';
import { StatsCard } from '../../StatsCard';
import { getProduct, deleteProduct } from '../../../lib/api/services/products';
export const Product = () => {

  const URL_PUBLIC =
    'https://backend-project-pam-production.up.railway.app/uploads/products/';
  
  const [product, setProduct] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const modalAdd = useModal();
  const modalEdit = useModal();

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
              sweetAlert.fire(
                'Deleted!',
                `Registration successfully deleted ${product.name}!`,
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
    getProducts().then((response) => {
      const { data } = response;
      setProduct(data.data);
    });
  }, [updateList]);
  return (
    <Container>
      <div className="mt-2 row">
        <StatsCard variant="primary" title="Product" quantity={product.length} ></StatsCard>
      </div>
      <div className="row py-3">
        <div className="col">
          <h2>Product List</h2>
        </div>
        <div className="col d-flex justify-content-end">
          <Button className="d-block" variant="primary">
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
                <img src={`${URL_PUBLIC}${item.image}`} width="100" />
              </td>
              <td className="align-middle">{item.name}</td>
              <td className="align-middle ">{item.description}</td>

              <td className="align-middle  ">{item.category?.name}</td>
              <td className="align-middle  ">{item.stock}</td>
              <td className="align-middle ">{item.price}</td>

              <td className="align-middle">
                <ButtonToolbar
                  className="justify-content-center "
                  style={{ height: '100%' }}
                >
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
                      modalEdit.handleShowModal();
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
        showModal={modalEdit.showModal}
        handleCloseModal={modalEdit.handleCloseModal}
        dataModal={dataModal}
        updateList={modalEdit.updateList}
        setUpdateList={setUpdateList}
      />
      <ModalAdd
        showModalAdd={modalAdd.showModal}
        handleCloseModalAdd={modalAdd.handleCloseModal}
        updateList={updateList}
        setUpdateList={setUpdateList}
      />
    </Container>
  );
};
