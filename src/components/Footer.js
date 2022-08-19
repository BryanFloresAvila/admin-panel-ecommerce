import React from 'react';
import { Link } from 'react-router-dom';
export const Footer = () => {
  return (
    <footer className="font-small py-2 bg-dark text-white ">
      <div className="footer-copyright text-center">
        © 2020 Copyright:
        <Link to="/">littlesop.com</Link>
      </div>
    </footer>
  );
};
