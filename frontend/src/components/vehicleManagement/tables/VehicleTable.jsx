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

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
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

    if (!(role === 'vehicleOfficer' || role === 'sysAdmin')) {
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
    { field: 'vehicleRegNo', headerName: 'Reg No', width: 100 },
    { field: 'vehicleBrand', headerName: 'Brand', width: 100 },
    { field: 'vehicleModel', headerName: 'Model', width: 100 },
    { field: 'owner', headerName: 'Owner', width: 100 },
    {
      field: 'vehicleCategory',
      headerName: 'Category',
      width: 200,
      renderCell: (params) => filterCategoryName(params.row.vehicleCategory)
    },
    { field: 'vehicleRegisteredYear', headerName: 'Register Year', width: 200 },
    { field: 'status', headerName: 'Status', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
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

    const result = await axios.get('http://localhost:3000/admin-portal/vehicle-management', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    setVehicles(result.data);
    rows = result.data;
    setLoading(false);
  };

  const fetchCategories = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        'http://localhost:3000/admin-portal/vehicle-management/categories',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setCategories(response.data);
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
    fetch('http://localhost:3000/admin-portal/vehicle-management', {
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
        console.error('Error fetching vehicles:', error);
      });
    setLoading(false);
    fetchData();
    fetchCategories();
  }, []);

  // filter category name
  const filterCategoryName = (id) => {
    if (categories.length > 0) {
      const category = categories.filter((category) => category._id === id);
      return category && category[0].vehicleCategoryName;
    }
    return 'No category';
  };

  const handleUpdate = (id) => {
    // redirect to update page
    navigate(`/vehicle-management/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/admin-portal/vehicle-management/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        fetchData();

        Swal.fire({
          title: 'Deleted!',
          text: 'Item has been deleted.',
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
      setVehicles(rows);
    } else {
      let timeoutID = setTimeout(() => {
        fetch('http://localhost:3000/admin-portal/vehicle-management/search/' + searchText, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
          .then((response) => response.json())
          .then((data) => {
            setVehicles(data);
          })
          .catch((error) => {
            console.error('Error fetching vehicles:', error);
          });
      }, 500);
      return () => {
        clearTimeout(timeoutID);
      };
    }
  }, [vehicles, searchText]);

  //generate report
  const generatepdf = async () => {
    await axios
      .post(`http://localhost:3000/admin-portal/vehicle-management/createpdf`, vehicles, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        axios
          .get('http://localhost:3000/admin-portal/vehicle-management/fetchpdf', {
            responseType: 'blob',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'vehicle-report.pdf');
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
            label="Search Vehicle"
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
            <NavLink end to="/vehicle-management/add-vehicle">
              Add Vehicle
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
          rows={searchText ? vehicles : rows}
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

export default VehicleTable;
