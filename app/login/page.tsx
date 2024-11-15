"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box, Link } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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
  const [isLocked, setIsLocked] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const router = useRouter();

  const getFailedAttempts = (username: string) => parseInt(Cookies.get(`failedAttempts_${username}`) || "0");
  const setFailedAttempts = (username: string, attempts: number) => Cookies.set(`failedAttempts_${username}`, attempts.toString(), { expires: 0.02 });
  const setLockoutEndTime = (username: string, endTime: number) => Cookies.set(`lockoutEndTime_${username}`, endTime.toString(), { expires: 0.02 });

  const calculateTimeRemaining = (username: string) => {
    const lockoutEndTime = parseInt(Cookies.get(`lockoutEndTime_${username}`) || "0");
    const currentTime = Date.now();
    const remaining = lockoutEndTime - currentTime;
    setTimeRemaining(remaining > 0 ? remaining : null);
    setIsLocked(remaining > 0);
  };

  useEffect(() => {
    if (initialValues.username) calculateTimeRemaining(initialValues.username);

    if (isLocked) {
      const intervalId = setInterval(() => {
        if (initialValues.username) calculateTimeRemaining(initialValues.username);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isLocked]);

  const handleSubmit = async (values: LoginFormValues) => {
    const { username } = values;
    calculateTimeRemaining(username);

    if (isLocked) {
      setMessage(" Please try again to login.");
      return;
    }

    try {
      const response = await axios.post("/api/login", values);

      if (response.status === 200) {
        setMessage("Login successful");
        router.push(`/profile/${response.data.userID}`);
        setFailedAttempts(username, 0); // Reset failed attempts on success
      }
    } catch (error: any) {
      const attempts = getFailedAttempts(username) + 1;
      setFailedAttempts(username, attempts);

      if (attempts >= 3) {
        const lockoutEndTime = Date.now() + 30 * 60 * 1000; // 30 minutes
        setLockoutEndTime(username, lockoutEndTime);
        calculateTimeRemaining(username);
        setMessage("Account disabled for 30 minutes. Please try again later.");
      } else {
        setMessage(`Login failed. ${3 - attempts} attempts remaining.`);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
        <Box bgcolor="white" boxShadow={3} p={4} borderRadius={2} maxWidth="400px" width="100%" textAlign="center">
          <Typography variant="h4" component="h1" gutterBottom>
            Login Form
          </Typography>
          {message && <Typography color="error">{message}</Typography>}
          {isLocked && timeRemaining !== null && (
            <Typography color="error">
              Account disabled. Try again in {Math.floor(timeRemaining / 60000)}:{Math.floor((timeRemaining % 60000) / 1000).toString().padStart(2, "0")}
            </Typography>
          )}
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ py: 1.5 }}>
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
