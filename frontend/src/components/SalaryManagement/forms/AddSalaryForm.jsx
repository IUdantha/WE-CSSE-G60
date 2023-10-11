import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Grid, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const API_URL = 'http://localhost:3000/admin-portal/salary-management';

const initialValues = {
  employeeId: '',
  employeeName: '',
  jobTitle: '',
  role: '',
  basicSalary: '',
  netSalary: '',
  status: ''
};

const validationSchema = Yup.object().shape({
  employeeId: Yup.string()
    .matches(
      /^[A-Z0-9]{2,3}-\d{4}$/,
      'EmpID formats are XX-0000, XXX-0000 | Letters should be in capital'
    )
    .required('EmpID is required'),
  employeeName: Yup.string().required('Name is required'),
  jobTitle: Yup.string().required('Title is required'),
  role: Yup.string().required('Role is required'),
  basicSalary: Yup.number().required('Basic Salary is required'),
  netSalary: Yup.number().required('Net Salary is required'),
  status: Yup.string().required('Status is required')
});

const AddSalaryForm = () => {
  const [increments, setIncrements] = useState([]);
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

  useEffect(() => {
    const fetchIncrements = async () => {
      try {
        const response = await axios.get(API_URL + '/increments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
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
    };
    fetchIncrements();
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          API_URL,
          {
            salaryEmployeeID: values.employeeId,
            salaryEmployeeName: values.employeeName,
            salaryJobTitle: values.jobTitle,
            salaryRole: values.role,
            salaryBasicSalary: values.basicSalary,
            salaryNetSalary: values.netSalary,
            salaryStatus: values.status
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
          title: 'Salary added successfully!'
        });

        // Redirect to salary management page
        navigate('/salary-management');
        // Reset the form
        formik.resetForm();
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 401) {
          Swal.fire(
            {
              icon: 'warning',
              title: 'Unauthorized',
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
            label="Employee Id"
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
            {formik.touched.role && formik.errors.role ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.role}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="role"
            name="role"
            label="Role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.role && Boolean(formik.errors.role)}
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

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.status && formik.errors.status ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.status}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            select
            id="status"
            name="status"
            label="Status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.status && Boolean(formik.errors.status)}>
            <MenuItem key="paid" value="paid">
              Paid
            </MenuItem>
            <MenuItem key="unpaid" value="unpaid">
              Unpaid
            </MenuItem>
            <MenuItem key="inprogress" value="in progress">
              In Progress
            </MenuItem>
          </TextField>
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
export default AddSalaryForm;
