"use client";

import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box, Link } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

interface LoginFormValues {
  username: string;
  password: string;
}

// Initial form values
const initialValues: LoginFormValues = {
  username: "",
  password: "",
};

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  // Form submission handler
  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const response = await axios.post('/api/login', values);
      
      // If login is successful, redirect to profile page
      if (response.status === 200) {
        setMessage("Login successful");
        router.push("/profile");  // Redirects to the profile page
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Login failed");
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
          textAlign="center"
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login Form
          </Typography>
          {message && <Typography color="error">{message}</Typography>}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <Box mb={3}>
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
                </Box>
                <Box mb={3}>
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    required
                    variant="outlined"
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={<ErrorMessage name="password" />}
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link component={NextLink} href="/registration" color="primary">
              Register
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
