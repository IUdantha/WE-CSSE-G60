import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const validations = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .matches(/^\d{10}$/, 'Only 10 digits allowed')
    .required('Phone is required'),
  NIC: yup
    .string()
    .matches(/^.{10}$/, 'Only 10 digits allowed')
    .max(10)
    .required('NIC is required'),
  DOB: yup.date().required('DOB is required'),
  employeeID: yup.string().required('Employee ID is required'),
  staffEmail: yup.string().email('Invalid email').required('Staff Email is required'),
  password: yup
    .string()
    .matches(
      passwordRules,
      'Password must contain at least one number, one uppercase and one lowercase letter, and at least 5 or more characters'
    )
    .required('Password is required'),
  department: yup.string().required('Department is required'),
  role: yup.string().required('Role is required')
});
