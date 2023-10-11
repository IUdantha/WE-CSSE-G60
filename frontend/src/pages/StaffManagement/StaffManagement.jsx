import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Main from '../../components/StaffManagement/Main';
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import './styles.css';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
const StaffManagementLayout = styled.div``;

const StaffManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const generatePDF = async () => {
    await axios
      .post(`http://localhost:3000/admin-portal/staff-management/createpdf`, users, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        axios
          .get('http://localhost:3000/admin-portal/staff-management/fetchpdf', {
            responseType: 'blob',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'StaffReport.pdf');
          });
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/admin-portal/staff-management/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          Swal.fire(
            {
              icon: 'warning',
              title: 'Unauthorized',
              text: error.response.data.message
            },
            navigate('/home')
          );
        } else if (error.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Not Logged In',
            text: error.response.data.message
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong...',
            text: error.response.data.message
          });
        }
      });
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const searchedUsers = users.filter((user) =>
    user._id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure?',
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/admin-portal/staff-management/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
          .then(() => {
            Swal.fire({
              title: 'Deleted Success!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            });
            const updatedUsers = users.filter((user) => user._id !== id);
            setUsers(updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
          })
          .catch(() => {
            alert('Error');
          });
      } else {
        Swal.fire('Employee not deleted');
      }
    });
  };
  const handleClick = (id) => {
    localStorage.setItem('userID', JSON.stringify(id));
  };
  const columns = [
    {
      field: 'empID',
      headerClassName: 'headerStyles',
      headerName: 'Employee ID',
      flex: 1,
      valueFormatter: (params) => params.value.slice(-4)
    },
    { field: 'name', headerClassName: 'headerStyles', headerName: 'Name', flex: 1 },
    { field: 'role', headerClassName: 'headerStyles', headerName: 'Role', flex: 1 },
    { field: 'department', headerClassName: 'headerStyles', headerName: 'Department', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      headerClassName: 'headerStyles',
      flex: 1,
      Align: 'center',
      renderCell: (params) => (
        <>
          <Link to="/staff-management/update-member">
            <Button
              variant="outlined"
              style={{ margin: '5px' }}
              onClick={() => handleClick(params.id)}>
              <Edit style={{ fontSize: '19px' }} />
            </Button>
          </Link>
          <Button
            variant="outlined"
            style={{ margin: '5px' }}
            color="error"
            onClick={() => handleDelete(params.id)}>
            <Delete style={{ fontSize: '19px' }} />
          </Button>
        </>
      )
    }
  ];

  const checkRole = (role) => {
    switch (role) {
      case 'user':
        return 'User';
      case 'staffManager':
        return 'Staff Manager';
      case 'sysAdmin':
        return 'System Administrator';
      case 'productManager':
        return 'Product Manager';
      case 'vehicleOfficer':
        return 'Vehicle Officer';
      case 'stockManager':
        return 'Stock Manager';
      case 'salesManager':
        return 'Sales Manager';
      case 'machineManager':
        return 'Machine Manager';
      case 'cropManager':
        return 'Crop Manager';
      case 'technicalManager':
        return 'Technical Manager';
      case 'payrollManager':
        return 'Payroll Manager';
      default:
        return 'User';
    }
  };

  const staff = searchedUsers.map((user) => ({
    empID: user._id,
    name: user.name,
    role: checkRole(user.role),
    department: user.department
  }));

  return (
    <StaffManagementLayout className="flex flex-col">
      <Header />
      <Main
        columns={columns}
        rows={staff}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        generatePDF={generatePDF}
      />
    </StaffManagementLayout>
  );
};

export default StaffManagement;
