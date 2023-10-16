import { Grid, MenuItem, TextField } from '@mui/material';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditInspectorForm() {
  const params = useParams();
  const [inspectors, setInspectors] = useState([]);
  const navigate = useNavigate();

  const id = params.id;

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

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'http://localhost:3000/admin-portal/transport-management/inspectors/' + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setIncrements(result.data);
    };
    fetchData();
  }, []);

  const validate = (values) => {
    const errors = {};
    if (!values.inspectorId) {
      errors.inspectorId = 'Required';
    }
    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.contactNumber) {
      errors.contactNumber = 'Required';
    }
    if (!values.busId) {
      errors.busId = 'Required';
    }
    if (!values.route) {
      errors.route = 'Required';
    }
    if (!values.salary) {
      errors.salary = 'Required';
    }
    if (!values.salStatus) {
      errors.salStatus = 'Required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      inspectorId: inspectors.inspectorID,
      name: inspectors.inspectorName,
      contactNumber: inspectors.inspectorContact,
      busId: inspectors.busID,
      route: inspectors.busRoute,
      salary: inspectors.inspectorSalary,
      salStatus: inspectors.inspectorStatus
    },

    enableReinitialize: true,

    onSubmit: (values) => {
      // send data to backend
      (async () => {
        try {
          const res = await axios.patch(
            'http://localhost:3000/admin-portal/transport-management/inspectors/' + id,
            {
              inspectorID: values.inspectorId,
              inspectorName: values.name,
              inspectorContact: values.contactNumber,
              busID: values.busId,
              busRoute: values.route,
              inspectorSalary: values.salary,
              inspectorStatus: values.salStatus
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
            title: 'Increment updated successfully!'
          });

          navigate('/transport-management/inspector');
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
      })();
    },

    validate: validate
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.inspectorId && formik.errors.inspectorId ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.inspectorId}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="inspectorId"
            name="inspectorId"
            label="Inspector ID"
            value={formik.values.inspectorId || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.inspectorId && Boolean(formik.errors.inspectorId)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.name && formik.errors.name ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.name}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Inspector Name"
            value={formik.values.name || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.contactNumber && formik.errors.contactNumber ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.contactNumber}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="contactNumber"
            name="contactNumber"
            label="Job Title"
            value={formik.values.contactNumber || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
          />
        </Grid>

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
            value={formik.values.busId || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.busId && Boolean(formik.errors.busId)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.route && formik.errors.route ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.route}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="route"
            name="route"
            label="Bus Route"
            value={formik.values.route || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.route && Boolean(formik.errors.route)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.salary && formik.errors.salary ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.salary}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="salary"
            name="salary"
            label="Salary"
            value={formik.values.salary || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.salary && Boolean(formik.errors.salary)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.salStatus && formik.errors.salStatus ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">
                {formik.errors.salStatus}
              </p>
            ) : null}
          </div>
          <TextField
            fullWidth
            select
            id="salStatus"
            name="salStatus"
            label="Salary Status"
            value={formik.values.salStatus || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.salStatus && Boolean(formik.errors.salStatus)}>
            <MenuItem key="paid" value="paid">
              Paid
            </MenuItem>
            <MenuItem key="unpaid" value="unpaid">
              Unpaid
            </MenuItem>
            <MenuItem key="pending" value="pending">
              Pending
            </MenuItem>
          </TextField>
        </Grid>


        <Grid item xs={12}>
          <div className="flex justify-end">
            <button
              className="w-56 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              type="submit">
              UPDATE
            </button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}
export default EditInspectorForm;
