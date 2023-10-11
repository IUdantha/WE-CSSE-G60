import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import axios from 'axios';
// import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField } from '@mui/material';
import { saveAs } from 'file-saver';
import { NavLink } from 'react-router-dom';

let rows = [];

const SalaryTable = () => {
  const [salaries, setSalaries] = useState([]);
  const [increments, setIncrements] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || token == null) {
      Swal.fire(
        {
          icon: 'warning',
          title: 'Unauthorized',
          text: 'Please Login'
        },
        navigate('/')
      );

      return;
    }

    if (!(role === 'payrollManager' || role === 'sysAdmin')) {
      Swal.fire(
        {
          icon: 'warning',
          title: 'Unauthorized'
        },
        navigate('/home')
      );
    }
  });

  const columns = [
    { field: 'salaryEmployeeID', headerName: 'Employee ID', width: 110 },
    { field: 'salaryEmployeeName', headerName: 'Employee Name', width: 170 },
    { field: 'salaryJobTitle', headerName: 'Job Title', width: 150 },
    { field: 'salaryRole', headerName: 'Job Role', width: 100 },
    { field: 'salaryBasicSalary', headerName: 'Basic Salary', width: 170 },
    { field: 'salaryNetSalary', headerName: 'Net Salary', width: 150 },
    { field: 'salaryStatus', headerName: 'Status', width: 200 },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        //delete and update icon actions
        <div>
          <button
            className="mr-4 text-green-600 hover:text-red-900"
            onClick={() => handleUpdate(params.row._id)}>
            <EditIcon />
          </button>
          <button
            className="text-red-600 hover:text-red-900"
            onClick={() => handleConfirmation(params.row._id)}>
            <DeleteIcon />
          </button>
        </div>
      )
    }
  ];

  const fetchData = async () => {
    setLoading(true);
    const result = await axios.get('http://localhost:3000/admin-portal/salary-management', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    setSalaries(result.data);
    rows = result.data;
    setLoading(false);
  };

  const fetchIncrements = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        'http://localhost:3000/admin-portal/salary-management/increment',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setIncrements(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire(
          {
            icon: 'warning',
            title: 'Login Required',
            text: error.response.data.message
          },
          navigate('/')
        );
      }

      if (error.response.status === 403) {
        Swal.fire(
          {
            icon: 'warning',
            title: 'Unauthorized',
            text: error.response.data.message
          },
          navigate('/home')
        );
      }
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/admin-portal/salary-management', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        rows = data;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          Swal.fire(
            {
              icon: 'warning',
              title: 'Login Required',
              text: error.response.data.message
            },
            navigate('/')
          );
        }

        if (error.response.status === 403) {
          Swal.fire(
            {
              icon: 'warning',
              title: 'Unauthorized',
              text: error.response.data.message
            },
            navigate('/home')
          );
        }
        console.error('Error fetching salaries:', error);
      });
    setLoading(false);
    fetchData();
    fetchIncrements();
  }, []);

  const handleUpdate = (id) => {
    // redirect to update salary page
    navigate(`/salary-management/edit-salary/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/admin-portal/salary-management/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        fetchData();

        Swal.fire({
          title: 'Deleted!',
          text: 'Salary has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          Swal.fire(
            {
              icon: 'warning',
              title: 'Login Required',
              text: error.response.data.message
            },
            navigate('/')
          );
        }

        if (error.response.status === 403) {
          Swal.fire(
            {
              icon: 'warning',
              title: 'Unauthorized',
              text: error.response.data.message
            },
            navigate('/home')
          );
        }
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Item could not be deleted.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  const handleConfirmation = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (searchText.trim() === '') {
      setSalaries(rows);
    } else {
      let timeoutID = setTimeout(() => {
        fetch('http://localhost:3000/admin-portal/salary-management/search/' + searchText, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
          .then((response) => response.json())
          .then((data) => {
            setSalaries(data);
          })
          .catch((error) => {
            console.error('Error fetching Salaries:', error);
          });
      }, 500);
      return () => {
        clearTimeout(timeoutID);
      };
    }
  }, [salaries, searchText]);

  //generate report
  const generatepdf = async () => {
    await axios
      .post(`http://localhost:3000/admin-portal/salary-management/createpdf`, salaries, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        axios
          .get('http://localhost:3000/admin-portal/salary-management/fetchpdf', {
            responseType: 'blob',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'salary-report.pdf');
          });
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <TextField
            label="Search Salary"
            value={searchText}
            onChange={handleSearch}
            sx={{ mb: 2 }}
          />
        </div>
        <div className="flex justify-end">
          <Button
            style={{
              backgroundColor: '#000000',
              color: '#fff',
              maxHeight: '50px',
              marginRight: '10px',
              borderRadius: '10px'
            }}>
            <NavLink end to="/salary-management/add-salary">
              Add Salary
            </NavLink>
          </Button>
          <Button
            style={{
              backgroundColor: '#4CAF50',
              color: '#fff',
              maxHeight: '50px',
              borderRadius: '10px'
            }}
            className=""
            onClick={generatepdf}>
            Export Report
          </Button>
        </div>
      </div>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={searchText ? salaries : rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableRowSelectionOnClick
          getRowId={(row) => row._id}
          autoPageSize={true}
        />
      </div>
    </>
  );
};

export default SalaryTable;
