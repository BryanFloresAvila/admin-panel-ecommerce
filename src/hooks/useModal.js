import { useState } from 'react';

export const useModal = (templateForm = {}) => {
  const state = {
    show: false,
    data: templateForm,
  };
  const [stateModal, setStateModal] = useState(state);
  const { show, data } = stateModal;

  const handleClose = () => {
    setStateModal({
      ...stateModal,
      show: false,
    });
  };
  const handleShow = (data) => {
    setStateModal({
      ...stateModal,
      show: true,
      data,
    });
  };

  const setData = (data) => {
    setStateModal({
      ...stateModal,
      data,
    });
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return { data, show, handleClose, handleShow, setData, handleChange };
};
