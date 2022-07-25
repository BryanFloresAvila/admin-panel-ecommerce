import React from 'react';
import { Link } from 'react-router-dom';
export const Footer = () => {
  return (
    <footer className="font-small py-4 bg-dark text-white ">
      <div
        /* style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} */
        className="footer-copyright text-center"
      >
        © 2020 Copyright:
        <Link to="/">littlesop.com</Link>
      </div>
    </footer>
  );
};
