import React, { useEffect, useState } from 'react';
import { getProducts } from '../../helpers/getProducts';
import { Table, Button, ButtonToolbar, Modal, Form } from 'react-bootstrap';
export const Product = () => {
  const URL_PUBLIC = 'https://backend-project-pam-production.up.railway.app/uploads/products/';
  const [product, setProduct] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  useEffect(()=>{
    getProducts().then((data) => {
      console.log(data.data)
      setProduct(data.data)
    });
  },[updateList]);
  return (
    
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {product.map((item, index) => (
          <tr>
            <th scope="row">{index + 1}</th>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.price}</td>
            <td>{item.category}</td>
            <td><img src={`${URL_PUBLIC}${item.image}`} alt={item.name} width="100" /></td>
            <td>
              <ButtonToolbar className='justify-content-center'>
                <Button
                  variant="danger"
                  className="me-3"
                  onClick={() => {
                    setUpdateList(!updateList);
                  }
                  }
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setUpdateList(!updateList);
                  }
                  }
                >
                  Edit
                </Button>
              </ButtonToolbar>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
