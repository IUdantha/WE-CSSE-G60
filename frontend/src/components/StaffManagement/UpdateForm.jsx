import { Box, Button, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
const UpdateForm = () => {
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

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    staffEmail: '',
    department: '',
    role: ''
  });

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem('userID'));
    const getUser = async () => {
      const res = await axios.get(
        `http://localhost:3000/admin-portal/staff-management/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setUserData(res.data);
      console.log(id);
    };
    getUser();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = JSON.parse(localStorage.getItem('userID'));
    try {
      await axios.patch(`http://localhost:3000/admin-portal/staff-management/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      Swal.fire({
        title: 'Updated Successfully!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/staff-management');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message
      });
    }
  };

  return (
    <MainLayout className="p-10 mb-[20px] bg-white rounded-xl h-full">
      <FormLayout>
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
              value={userData.name}
              id="outlined-basic"
              label="Name"
              name="name"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              value={userData.email}
              name="email"
              id="outlined-basic"
              label="Personal E-mail"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              value={userData.phone}
              name="phone"
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              onChange={handleChange}
            />
            {/* <TextField
              value={userData.NIC}
              name="NIC"
              id="outlined-basic"
              label="NIC"
              variant="outlined"
              onChange={handleChange}
            /> */}
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="DOB"
                label="Date of Birth"
                value={userData.DOB}
                onChange={(date) => setUserData({ ...userData, DOB: date })}
                format="DD/MM/YYYY"
                textField={<TextField />}
              />
            </LocalizationProvider> */}
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
            {/* <TextField
              value={userData.employeeID}
              name="employeeID"
              fullWidth
              id="outlined-basic"
              label="Employee ID"
              variant="outlined"
              onChange={handleChange}
            /> */}
            <TextField
              value={userData.staffEmail}
              name="staffEmail"
              fullWidth
              id="outlined-basic"
              label="E-mail"
              variant="outlined"
              onChange={handleChange}
            />
            {/* <TextField
              name="password"
              value={userData.password}
              type="password"
              fullWidth
              id="outlined-basic"
              label="Password"
              variant="outlined"
              onChange={handleChange}
            /> */}
            <TextField
              value={userData.department}
              name="department"
              fullWidth
              id="outlined-basic"
              label="Department"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              name="role"
              value={userData.role}
              fullWidth
              select
              label="Select"
              helperText={roles.label}
              variant="outlined"
              onChange={handleChange}>
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
          onClick={handleSubmit}
          style={{
            textTransform: 'none',
            maxHeight: '40px',
            borderRadius: '10px'
          }}
          variant="contained">
          Update User
        </Button>
      </Footer>
    </MainLayout>
  );
};

export default UpdateForm;
