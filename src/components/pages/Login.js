import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../store/context/authContext';
import { login } from '../../store/actions/actions';
import Spinner from 'react-bootstrap/Spinner';
export const Login = () => {
  const { state, dispatch } = useAuth();
  const { loadingLogin } = state;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  if (loadingLogin) {
    return <Spinner animation="border" variant="primary" />;
  }
  return (
    <div className="container d-flex flex-column align-items-center pt-5">
      <div className="shadow p-3 mb-5  rounded" style={{ width: '400px' }}>
        <div className="my-3">
          <h2 className="text-center font-monospace ">Login</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              id="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button className=" w-100" variant="primary" type="submit">
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
};
