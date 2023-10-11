import { Box, Button, MenuItem, TextField } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { validations } from '../../validations/addStaff';
import Swal from 'sweetalert2';
const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const FormLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const PersonalDetails = styled.div`
  flex: 1;
`;
const StaffAccount = styled.div`
  flex: 1;
`;
const Heading = styled.div``;
const StaffForm = () => {
  const navigate = useNavigate();

  const roles = [
    { value: 'user', label: 'User' },
    { value: 'staffManager', label: 'Staff Manager' },
    { value: 'sysAdmin', label: 'System Administrator' },
    { value: 'productManager', label: 'Product Manager' },
    { value: 'vehicleOfficer', label: 'Vehicle Officer' },
    { value: 'stockManager', label: 'Stock Manager' },
    { value: 'salesManager', label: 'Sales Manager' },
    { value: 'technicalManager', label: 'Technical Manager' },
    { value: 'cropManager', label: 'Crop Manager' },
    { value: 'payrollManager', label: 'Payroll Manager' }
  ];

  // const handleChange = (e) => {
  //   setUserData({ ...userData, [e.target.name]: e.target.value });
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/admin-portal/staff-management/register', values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      Swal.fire({
        title: 'Add Success!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/staff-management');
      resetForm();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message
      });
    }
  };
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      NIC: '',
      DOB: '',
      employeeID: '',
      staffEmail: '',
      password: '',
      department: '',
      role: ''
    },
    validationSchema: validations,
    onSubmit: handleFormSubmit
  });
  return (
    <MainLayout className="p-10 mb-[20px] bg-white rounded-xl h-full">
      <FormLayout onSubmit={handleSubmit}>
        <PersonalDetails>
          <Heading>Personal Details</Heading>
          <Box
            alignItems="center"
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              '& .MuiTextField-root': { m: 1, width: '50ch' }
            }}
            noValidate
            autoComplete="off">
            <TextField
              onBlur={handleBlur}
              value={values.name}
              id="outlined-basic"
              label="Name"
              name="name"
              variant="outlined"
              onChange={handleChange}
              error={Boolean(touched.name) && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              onBlur={handleBlur}
              value={values.email}
              name="email"
              id="outlined-basic"
              label="Personal E-mail"
              variant="outlined"
              onChange={handleChange}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              onBlur={handleBlur}
              value={values.phone}
              name="phone"
              id="outlined-basic"
              type="number"
              label="Phone"
              variant="outlined"
              onChange={handleChange}
              error={Boolean(touched.phone) && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
            />
            <TextField
              onBlur={handleBlur}
              value={values.NIC}
              name="NIC"
              id="outlined-basic"
              label="NIC"
              variant="outlined"
              onChange={handleChange}
              error={Boolean(touched.NIC) && Boolean(errors.NIC)}
              helperText={touched.NIC && errors.NIC}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onBlur={handleBlur}
                name="DOB"
                label="Date of Birth"
                value={values.DOB}
                onChange={(date) => setFieldValue('DOB', date)}
                format="DD/MM/YYYY"
                textField={<TextField />}
              />
            </LocalizationProvider>
          </Box>
        </PersonalDetails>
        <StaffAccount>
          <Heading>Staff Account</Heading>
          <Box
            alignItems="center"
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              '& .MuiTextField-root': { m: 1, width: '50ch' }
            }}
            noValidate
            autoComplete="off">
            <TextField
              onBlur={handleBlur}
              value={values.employeeID}
              name="employeeID"
              fullWidth
              id="outlined-basic"
              label="Employee ID"
              variant="outlined"
              onChange={handleChange}
              error={Boolean(touched.employeeID) && Boolean(errors.employeeID)}
              helperText={touched.employeeID && errors.employeeID}
            />
            <TextField
              onBlur={handleBlur}
              value={values.staffEmail}
              name="staffEmail"
              fullWidth
              id="outlined-basic"
              label="E-mail"
              variant="outlined"
              onChange={handleChange}
              error={Boolean(touched.staffEmail) && Boolean(errors.staffEmail)}
              helperText={touched.staffEmail && errors.staffEmail}
            />
            <TextField
              onBlur={handleBlur}
              name="password"
              value={values.password}
              type="password"
              fullWidth
              id="outlined-basic"
              label="Password"
              variant="outlined"
              onChange={handleChange}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <TextField
              onBlur={handleBlur}
              value={values.department}
              name="department"
              fullWidth
              id="outlined-basic"
              label="Department"
              variant="outlined"
              onChange={handleChange}
              error={Boolean(touched.department) && Boolean(errors.department)}
              helperText={touched.department && errors.department}
            />
            <TextField
              onBlur={handleBlur}
              name="role"
              value={values.role}
              fullWidth
              select
              label="Select"
              defaultValue="user"
              variant="outlined"
              onChange={handleChange}
              error={Boolean(touched.role) && Boolean(errors.role)}
              helperText={touched.role && errors.role}>
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </StaffAccount>
      </FormLayout>
      <Footer>
        <Button
          onClick={handleFormSubmit}
          style={{
            textTransform: 'none',
            maxHeight: '40px',
            borderRadius: '10px'
          }}
          variant="contained">
          Add Staff Member
        </Button>
      </Footer>
    </MainLayout>
  );
};

export default StaffForm;
