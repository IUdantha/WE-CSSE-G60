import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField } from '@mui/material';

let rows = [];

const ScheduleTable = () => {
  const [schedules, setSchedules] = useState([]);
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

    if (!(role === 'transportManager' || role === 'sysAdmin')) {
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
    { field: 'scheduleBusId', headerName: 'Bus ID', width: 110 },
    { field: 'scheduleRouteId', headerName: 'Route ID', width: 170 },
    { field: 'scheduleDriver', headerName: 'Driver', width: 150 },
    { field: 'scheduleInspector', headerName: 'Inspector', width: 170 },
    { field: 'scheduleDepart', headerName: 'Departure', width: 150 },
    { field: 'scheduleArrive', headerName: 'Arrival', width: 150 },
    { field: 'scheduleLoad', headerName: 'Load', width: 200 },

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
    const result = await axios.get(
      'http://localhost:3000/admin-portal/transport-management/schedules',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      }
    );
    setSchedules(result.data);
    rows = result.data;
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/admin-portal/transport-management/schedules', {
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
        console.error('Error fetching schedules:', error);
      });
    setLoading(false);
    fetchData();
  }, []);

  const handleUpdate = (id) => {
    // redirect to update schedules page
    navigate(`/transport-management/edit-schedule/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/admin-portal/transport-management/schedules/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        fetchData();

        Swal.fire({
          title: 'Deleted!',
          text: 'Schedule Record has been deleted.',
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
        if (error.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Error!!!',
            text: error.response.data.message
          });
        }
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
      setSchedules(rows);
    } else {
      let timeoutID = setTimeout(() => {
        fetch(
          'http://localhost:3000/admin-portal/transport-management/schedules/search/' + searchText,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setSchedules(data);
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
            console.error('Error fetching schedules:', error);
          });
      }, 500);
      return () => {
        clearTimeout(timeoutID);
      };
    }
  }, [schedules, searchText]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <TextField
            label="Search Schedule"
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
            <NavLink end to="/transport-management/add-schedule">
              Add Schedule
            </NavLink>
          </Button>
        </div>
      </div>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={schedules}
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

export default ScheduleTable;
