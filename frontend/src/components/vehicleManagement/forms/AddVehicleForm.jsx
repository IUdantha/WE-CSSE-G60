import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Grid, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parse } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import * as Yup from 'yup';

const API_URL = 'http://localhost:3000/admin-portal/vehicle-management';

const initialValues = {
  registrationNumber: '',
  brand: '',
  model: '',
  boughtDate: new Date(),
  registerYear: new Date(),
  owner: '',
  category: ''
};

const validationSchema = Yup.object().shape({
  registrationNumber: Yup.string()
    .matches(
      /^[A-Z0-9]{2,3}-\d{4}$/,
      'RegNo formats are XX-0000, XXX-0000 | Letters should be in capital'
    )
    .required('RegNo is required'),
  brand: Yup.string().required('Brand is required'),
  model: Yup.string().required('Model is required'),
  boughtDate: Yup.date().required('Bought Date is required'),
  registerYear: Yup.date().required('Register Year is required'),
  owner: Yup.string().required('Owner is required').min(5),
  category: Yup.string().required('Category is required')
});

const AddVehicleForm = () => {
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_URL + '/categories', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
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
    };
    fetchCategories();
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          API_URL,
          {
            vehicleRegNo: values.registrationNumber,
            vehicleBrand: values.brand,
            vehicleModel: values.model,
            vehicleCategory: values.category,
            vehicleBoughtDate: values.boughtDate,
            vehicleRegisteredYear: values.registerYear.getFullYear(),
            owner: values.owner
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
          title: 'Vehicle Added successfully!'
        });
        // Redirect to vehicle management page
        navigate('/vehicle-management');
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
            title: 'Oops...',
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
            {formik.touched.registrationNumber && formik.errors.registrationNumber ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">
                {formik.errors.registrationNumber}
              </p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="registrationNumber"
            name="registrationNumber"
            label="Registration Number"
            value={formik.values.registrationNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.registrationNumber && Boolean(formik.errors.registrationNumber)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.brand && formik.errors.brand ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.brand}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="brand"
            name="brand"
            label="Brand"
            value={formik.values.brand}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.brand && Boolean(formik.errors.brand)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.model && formik.errors.model ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.model}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="model"
            name="model"
            label="Model"
            value={formik.values.model}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.model && Boolean(formik.errors.model)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.owner && formik.errors.owner ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.owner}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="owner"
            name="owner"
            label="Owner"
            value={formik.values.owner}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.owner && Boolean(formik.errors.owner)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.category && formik.errors.category ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.category}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            select
            id="category"
            name="category"
            label="Category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.category && Boolean(formik.errors.category)}>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.vehicleCategoryName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.registerYear && formik.errors.registerYear ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.registerYear}</p>
            ) : null}
          </div>

          <DatePicker
            selected={formik.values.registerYear}
            className="w-full p-3 border border-gray-300 rounded-md z-100"
            onChange={(year) => formik.setFieldValue('registerYear', year)}
            onBlur={formik.handleBlur}
            error={formik.touched.registerYear && Boolean(formik.errors.registerYear)}
            showYearPicker
            dateFormat="yyyy"
            placeholderText="Registered year"
            id="registerYear"
            name="registerYear"
            maxDate={moment().toDate()}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.boughtDate && formik.errors.boughtDate ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.boughtDate}</p>
            ) : null}
          </div>

          <label htmlFor="date" className="ml-3 opacity-60">
            Date
          </label>
          <DatePicker
            className="w-full p-3 border border-gray-300 rounded-md"
            id="boughtDate"
            name="boughtDate"
            selected={formik.values.boughtDate}
            onChange={(boughtDate) => formik.setFieldValue('boughtDate', boughtDate)}
            onBlur={formik.handleBlur}
            dateFormat="dd/MM/yyyy" // customize date format
            parseDate={(str) => parse(str, 'dd/MM/yyyy', new Date())} // parse date string
            formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)} // customize weekday format
            maxDate={moment().toDate()}
          />
        </Grid>
        <Grid item xs={12}>
          <div className="flex justify-end">
            <button
              className="w-56 px-4 py-2 font-bold text-white bg-[#4CAF50] rounded"
              type="submit">
              Add
            </button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};
export default AddVehicleForm;
