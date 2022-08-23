import { Button, Modal, Form } from 'react-bootstrap';
import sweetAlert from 'sweetalert2';
import { updateProduct as serviceUpdateProduct } from '../../../lib/api/services/products';
import { useCategoryStore, useProductStore } from '../../../store/index';
import { configUpdatedError, configUpdate, configUpdated } from '../../../utils/sl2/configs';
import { updateProduct, updateProductFail, updateProductSuccess } from '../../../store/actions/product/action';
export const ModalEdit = ({ updateList, setUpdateList, handleClose, show, data, handleChange }) => {
  const { dispatch: dispatchProduct, StateProduct } = useProductStore();
  const { StateCategories } = useCategoryStore();
  const { product } = StateProduct;
  const { categories } = StateCategories;

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
    sweetAlert.fire(configUpdate(product.name)).then((result) => {
      if (result.isConfirmed) {
        dispatchProduct(updateProduct());
        serviceUpdateProduct(product._id, data)
          .then((response) => {
            if (response.status !== 200) sweetAlert.fire(configUpdatedError(product.name));
            return response.data;
          })
          .then(() => {
            dispatchProduct(updateProductSuccess());
            sweetAlert.fire(configUpdated(product.name));
            handleClose();
            setUpdateList(!updateList);
          })
          .catch((error) => {
            dispatchProduct(updateProductFail(error.message));
            sweetAlert.fire(configUpdatedError(product.name));
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
          <Form.Group className="mb-1">
            <Form.Label>Name Product</Form.Label>
            <Form.Control type="text" name="name" onChange={handleChange} value={data.name} required />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" onChange={handleChange} value={data.description} required />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Name Category</Form.Label>
            <Form.Select name="category">
              <option value={data.category?._id}>{data.category?.name}</option>
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
            <Form.Control type="number" onChange={handleChange} name="stock" value={data.stock} />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" onChange={handleChange} name="price" value={data.price} />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-1">
            <Form.Label>Image</Form.Label>
            <Form.Control name="image" type="file" />
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
