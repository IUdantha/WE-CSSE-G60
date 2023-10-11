import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function AddCatForm() {
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
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

  const formik = useFormik({
    initialValues: {
      name: ''
    },

    onSubmit: (values) => {
      // send data to backend
      (async () => {
        try {
          const res = await axios.post(
            'http://localhost:3000/admin-portal/vehicle-management/categories',
            {
              vehicleCategoryName: values.name
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
            title: 'Category Added successfully!'
          });

          navigate('/vehicle-management/category');
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
              title: 'Oops...',
              text: error.response.data.message
            });
          }
        }
      })();

      // reset form
      formik.resetForm();
    },

    validate: validate
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col items-center justify-center">
      <div className="w-64 mt-3 mb-8">
        <div>
          {formik.touched.name && formik.errors.name ? (
            <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.name}</p>
          ) : null}
        </div>
        <TextField
          label="Category Name"
          value={formik.values.name}
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{ width: '100%' }}
          error={formik.touched.name && Boolean(formik.errors.name)}
        />
      </div>

      <button className="w-56 px-4 py-2 font-bold text-white bg-[#4CAF50] rounded" type="submit">
        Add
      </button>
    </form>
  );
}
export default AddCatForm;
