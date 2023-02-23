import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser, { loading }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const { data } = await loginUser({
          variables: { ...userFormData },
        });

        Auth.login(data.login.token);
      } catch (err) {
        console.error(err);
        setShowAlert(true);
      }

      setUserFormData({ email: '', password: '' });
      setValidated(false);
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
        Something went wrong with your login credentials!
      </Alert>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          name='email'
          value={userFormData.email}
          onChange={handleInputChange}
          required
        />
        <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter password'
          name='password'
          value={userFormData.password}
          onChange={handleInputChange}
          required
        />
        <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
      </Form.Group>

      <Button
        variant='primary'
        type='submit'
        disabled={loading || !userFormData.email || !userFormData.password}
      >
        {loading ? 'Loading...' : 'Log In'}
      </Button>
    </Form>
  );
};

export default LoginForm;