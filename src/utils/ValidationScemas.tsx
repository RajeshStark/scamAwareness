import * as yup from "yup";

export const SignupSchema = yup.object().shape({
  first: yup.string().required("First name is required"),
  last: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  DOB: yup.string().required("Date of birth is required"),
  phone: yup.string().required("Phone number is required"),
  countrycode: yup.string().notRequired(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const signinSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
