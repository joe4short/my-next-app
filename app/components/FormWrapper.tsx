import React from 'react';
import { Container, Box, Typography } from '@mui/material';

interface FormWrapperProps {
  children: React.ReactNode;
  title: string;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, title }) => {
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
            {title}
          </Typography>
          {children}
        </Box>
      </Box>
    </Container>
  );
};

export default FormWrapper;
