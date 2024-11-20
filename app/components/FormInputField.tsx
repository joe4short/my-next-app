import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { TextField } from '@mui/material';

interface FormInputFieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  fullWidth?: boolean;
  variant?: "outlined" | "filled" | "standard";
}

const FormInputField: React.FC<FormInputFieldProps> = ({ name, label, type = "text" }) => {
    return (
      <div style={{ marginBottom: '16px' }}>
        <Field name={name}>
          {({ field, meta }: any) => (
            <TextField
              {...field}
              label={label}
              type={type}
              fullWidth
              variant="outlined"
              error={false} // Prevent the default red border behavior
              InputProps={{
                style: {
                  borderColor: meta.touched && meta.error ? 'black' : undefined, // Black border on error
                },
              }}
            />
          )}
        </Field>
        <div style={{ color: 'red', fontSize: '0.875em', marginTop: '4px' }}>
  <ErrorMessage name={name} component="div" />
</div>
        
      </div>
    );
  };
  
  export default FormInputField;
