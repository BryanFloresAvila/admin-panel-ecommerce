import { useState } from 'react';

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  return { showModal, handleCloseModal, handleShowModal };
};
