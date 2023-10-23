import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Grid, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/admin-portal/transport-management/schedules';

const initialValues = {
  busId: '',
  routeId: '',
  driver: '',
  inspector: '',
  depart: '',
  arrive: '',
  load: ''
};

const AddScheduleForm = () => {
  const navigate = useNavigate();

  const validation = (values) => {
    const errors = {};
    if (!values.busId) {
      errors.busId = 'Required';
    }
    if (!values.routeId) {
      errors.routeId = 'Required';
    }
    if (!values.driver) {
      errors.driver = 'Required';
    }
    if (!values.inspector) {
      errors.inspector = 'Required';
    }
    if (!values.depart) {
      errors.depart = 'Required';
    }
    if (!values.arrive) {
      errors.arrive = 'Required';
    }
    if (!values.load) {
      errors.load = 'Required';
    }
    return errors;
  };

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

  const formik = useFormik({
    initialValues,
    validate: validation,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          API_URL,
          {
              scheduleBusId: values.busId,
              scheduleRouteId: values.routeId,
              scheduleDriver: values.driver,
              scheduleInspector: values.inspector,
              scheduleDepart: values.depart,
              scheduleArrive: values.arrive,
              scheduleLoad: values.load
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          }
        );

        Swal.fire({
          icon: 'success',
          title: 'Schedule added successfully!'
        });

        // Redirect to income management page
        navigate('/transport-management/income');
        // Reset the form
        formik.resetForm();
      } catch (error) {
        console.log(error);
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
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.busId && formik.errors.busId ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.busId}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="busId"
            name="busId"
            label="Bus ID"
            value={formik.values.busId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.busId && Boolean(formik.errors.busId)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.routeId && formik.errors.routeId ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.routeId}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="routeId"
            name="routeId"
            label="Route ID"
            value={formik.values.routeId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.routeId && Boolean(formik.errors.routeId)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.driver && formik.errors.driver ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.driver}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="driver"
            name="driver"
            label="Driver Name"
            value={formik.values.driver}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.driver && Boolean(formik.errors.driver)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.inspector && formik.errors.inspector ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.inspector}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="inspector"
            name="inspector"
            label="Inspector Name"
            value={formik.values.inspector}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.inspector && Boolean(formik.errors.inspector)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.depart && formik.errors.depart ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.depart}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="depart"
            name="depart"
            label="Departure"
            value={formik.values.depart}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.depart && Boolean(formik.errors.depart)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.arrive && formik.errors.arrive ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.arrive}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="arrive"
            name="arrive"
            label="Arrival"
            value={formik.values.arrive}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.arrive && Boolean(formik.errors.arrive)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.load && formik.errors.load ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.load}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="load"
            name="load"
            label="Expected Load"
            value={formik.values.load}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.load && Boolean(formik.errors.load)}
          />
        </Grid>

        <Grid item xs={12}>
          <div className="flex justify-end">
            <button
              className="w-56 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              type="submit">
              ADD
            </button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};
export default AddScheduleForm;
