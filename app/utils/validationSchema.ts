import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(4, "Username must be at least 4 characters")
    .max(10, "Username cannot exceed 10 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password cannot exceed 15 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain one uppercase, one lowercase, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  mobilenumber: Yup.string()
    .matches(/^0\d{10}$/, 'Mobile number must start with "0" and be 11 digits long')
    .required("Mobile number is required"),
});

export default validationSchema;
