import React, { useEffect, useState } from 'react';
import { getProducts } from '../../helpers/getProducts';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
export const Product = () => {
  const URL_PUBLIC =
    'https://backend-project-pam-production.up.railway.app/uploads/products/';
  const [product, setProduct] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  useEffect(() => {
    getProducts().then((data) => {
      setProduct(data.data);
    });
  }, [updateList]);
  return (
    <div className="container-lg ">
      <div className="row py-3">
        <div className="col">
          <h2>Product List</h2>
        </div>
        <div className="col d-flex justify-content-end">
          <Button className="d-block" variant="primary">
            Add Category
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

              <td className="align-middle  ">{item.category}</td>
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
                      setUpdateList(!updateList);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    className="m-1"
                    variant="primary"
                    style={{ width: '70px' }}
                    onClick={() => {
                      setUpdateList(!updateList);
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
    </div>
  );
};
