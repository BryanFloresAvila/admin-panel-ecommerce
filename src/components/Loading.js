import React from 'react';

export const Loading = () => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border"
        style={{ width: '7rem', height: '7rem' }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
/* style={{ width: '7rem', height: '7rem' }} */
