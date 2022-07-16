import React, { useEffect, useState } from 'react';
import { getCategories } from '../../../helpers/getCategories';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import sweetAlert from 'sweetalert2';
import axios from 'axios';
import { ModalEdit } from './ModalEdit';
import { ModalAdd } from './ModalAdd';
import { Loading } from '../../../components/Loading';
import { useModal } from '../../../hooks/useModal';

export const Category = () => {
  const [updateList, setUpdateList] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataModal, setDataModal] = useState({});

  const modalAdd = useModal();
  const modalEdit = useModal();

  /* const handleChangeModal = ({ target }) => {
    console.log(target.value);
    return target.value;
  };
 */
  const handleDelete = (category) => {
    const URL = 'https://backend-project-pam-production.up.railway.app/api/v1/categories';
    sweetAlert
      .fire({
        title: `Are you sure to delete ${category.name} ?`,
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
          axios.delete(`${URL}/${category._id}`).then((response) => {
            if (response.status === 200) {
              sweetAlert.fire(
                'Deleted!',
                `Registration successfully deleted ${category.name}!`,
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
    getCategories().then((data) => {
      setLoading(false);
      setCategories(data.data);
    });
  }, [updateList]);

  return (
    <div className="container">
      <div className="row py-3">
        <div className="col">
          <h2>Category List</h2>
        </div>
        <div className="col d-flex justify-content-end">
          <Button className="d-block" variant="primary" onClick={modalAdd.handleShowModal}>
            Add Category
          </Button>
        </div>
      </div>
      <Table striped hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th className="text-center">Name</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td className="text-center">{category.name}</td>
              <td>
                <ButtonToolbar className="justify-content-center">
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
                      setDataModal(category);
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
      {loading && <Loading />}
    </div>
  );
};
