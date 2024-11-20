

import React, {createContext,useContext} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, TextField, Button } from "@mui/material";
import * as Yup from "yup";


interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => onLogin(values.username, values.password)}
    >
      {({ handleChange, errors, touched }) => (
        <Form>
          <Box mb={3}>
            <Field
              as={TextField}
              name="username"
              label="Username"
              fullWidth
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
              variant="outlined"
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={<ErrorMessage name="password" />}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
