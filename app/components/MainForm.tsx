'use client';

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import FormWrapper from './FormWrapper';
import FormInputField from './FormInputField';
import Message from './Message';
import { Button } from '@mui/material';

interface FormValues {
  username: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
  middlename?: string;
  email: string;
  mobilenumber: string;
}

const initialValues: FormValues = {
  username: '',
  password: '',
  confirmPassword: '',
  firstname: '',
  lastname: '',
  middlename: '',
  email: '',
  mobilenumber: '',
};

const validationSchema = Yup.object({
  username: Yup.string()
    .min(4, 'Username must be at least 4 characters')
    .max(10, 'Username cannot exceed 10 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(15, 'Password cannot exceed 15 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain one uppercase, one lowercase, one number, and one special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  firstname: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  mobilenumber: Yup.string()
    .matches(/^0\d{10}$/, 'Mobile number must start with "0" and be 11 digits long')
    .required('Mobile number is required'),
});

const MainForm: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await axios.post('/api/registration', values);
      setMessage(response.data.message || 'Registration successful');
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <FormWrapper title="Registration Form">
      {message && <Message message={message} color={message.includes('failed') ? "error" : "success"} />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <FormInputField name="username" label="Username" />
            <FormInputField name="password" label="Password" type="password" />
            <FormInputField name="confirmPassword" label="Confirm Password" type="password" />
            <FormInputField name="firstname" label="First Name" />
            <FormInputField name="lastname" label="Last Name" />
            <FormInputField name="middlename" label="Middle Name" />
            <FormInputField name="email" label="Email" type="email" />
            <FormInputField name="mobilenumber" label="Mobile Number" />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default MainForm;
