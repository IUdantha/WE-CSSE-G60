import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Grid, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/admin-portal/salary-management/increments';

const initialValues = {
  employeeId: '',
  employeeName: '',
  jobTitle: '',
  basicSalary: '',
  incrementType: '',
  increments: '',
  netSalary: ''
};

const AddIncrementForm = () => {
  const navigate = useNavigate();

  const validation = (values) => {
    const errors = {};
    if (!values.employeeName) {
      errors.employeeName = 'Required';
    }
    if (!values.jobTitle) {
      errors.jobTitle = 'Required';
    }
    if (!values.increments) {
      errors.increments = 'Required';
    }
    if (!values.basicSalary) {
      errors.basicSalary = 'Required';
    }
    if (!values.employeeId) {
      errors.employeeId = 'Required';
    }
    if (!values.netSalary) {
      errors.netSalary = 'Required';
    }
    if (!values.salincrementType) {
      errors.salincrementType = 'Required';
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

  const formik = useFormik({
    initialValues,
    validate: validation,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          API_URL,
          {
            salaryEmployeeID: values.employeeId,
            salaryEmployeeName: values.employeeName,
            salaryJobTitle: values.jobTitle,
            salaryBasicSalary: values.basicSalary,
            incrementType: values.salincrementType,
            incrementValue: values.increments,
            salaryNetSalary: values.netSalary
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
          title: 'Increment added successfully!'
        });

        // Redirect to salary management page
        navigate('/salary-management/increment');
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
            {formik.touched.employeeId && formik.errors.employeeId ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.employeeId}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="employeeId"
            name="employeeId"
            label="Employee ID"
            value={formik.values.employeeId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.employeeId && Boolean(formik.errors.employeeId)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.employeeName && formik.errors.employeeName ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.employeeName}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="employeeName"
            name="employeeName"
            label="Employee Name"
            value={formik.values.employeeName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.employeeName && Boolean(formik.errors.employeeName)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.jobTitle && formik.errors.jobTitle ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.jobTitle}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="jobTitle"
            name="jobTitle"
            label="Job Title"
            value={formik.values.jobTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.basicSalary && formik.errors.basicSalary ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.basicSalary}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="basicSalary"
            name="basicSalary"
            label="Basic Salary"
            value={formik.values.basicSalary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.basicSalary && Boolean(formik.errors.basicSalary)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.salincrementType && formik.errors.salincrementType ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">
                {formik.errors.salincrementType}
              </p>
            ) : null}
          </div>
          <TextField
            fullWidth
            select
            id="salincrementType"
            name="salincrementType"
            label="Increment Type"
            value={formik.values.salincrementType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.salincrementType && Boolean(formik.errors.salincrementType)}>
            <MenuItem key="annual" value="annual">
              Annual
            </MenuItem>
            <MenuItem key="promotional" value="promotional">
              Promotional
            </MenuItem>
            <MenuItem key="cola" value="cola">
              COLA
            </MenuItem>
            <MenuItem key="other" value="other">
              Other
            </MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.increments && formik.errors.increments ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.increments}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="increments"
            name="increments"
            label="Increments"
            value={formik.values.increments}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.increments && Boolean(formik.errors.increments)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.netSalary && formik.errors.netSalary ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.netSalary}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="netSalary"
            name="netSalary"
            label="Net Salary"
            value={formik.values.netSalary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.netSalary && Boolean(formik.errors.netSalary)}
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
export default AddIncrementForm;
