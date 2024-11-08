"use client";

import axios from "axios";
import React, { useState } from 'react';
import { Button, TextField, Container, Box, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  mobilenumber: Yup.string()
    .matches(/^0\d{10}$/, 'Mobile number must start with "0" and be 11 digits long')
    .required('Mobile number is required'),
});

const MyForm: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await axios.post('/api/registration', values);

      // Expecting a response message on success
      setMessage(response.data.message || 'Registration successful');
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box
          bgcolor="white"
          boxShadow={3}
          p={4}
          borderRadius={2}
          maxWidth="400px"
          width="100%"
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Sample Registration Form
          </Typography>
          {message && (
            <Typography color={message.includes('successfully') ? 'primary' : 'error'}>
              {message}
            </Typography>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <div>
                  <Field
                    as={TextField}
                    name="username"
                    label="Username"
                    fullWidth
                    required
                    variant="outlined"
                    onChange={handleChange}
                    error={touched.username && Boolean(errors.username)}
                    helperText={<ErrorMessage name="username" />}
                  />
                  {/* Other form fields */}
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Container>
  );
};

export default MyForm;
