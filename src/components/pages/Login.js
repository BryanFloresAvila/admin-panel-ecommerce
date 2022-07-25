import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../store/context/authContext';
import { login } from '../../store/actions/actions';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/Loading';
export const Login = () => {
  const { state, dispatch } = useAuth();
  const { loadingLogin, isLogged } = state;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate('/Home');
    }
  }, [isLogged, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  if (loadingLogin) {
    return <Loading />;
  }
  return (
    <div className="container">
      <div className=" row  rounded ">
        <div className="col col-xxl-5 col-xl-6 col-lg-7 col-md-7 col-sm-12 shadow p-5 m-auto">
          <h1 className=" p-3 text-center rounded">Admin Login</h1>
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
    </div>
  );
};
