import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Grid, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

const API_URL = 'http://localhost:3000/admin-portal/transport-management';

const initialValues = {
  routeId: '',
  busId: '',
  load: '',
  date: '',
  income: '',
  expenses: '',
  profit: ''
};

const validationSchema = Yup.object().shape({
  routeId: Yup.string().required('Route ID is required'),
  busId: Yup.string().required('Bus ID is required'),
  load: Yup.string().required('Load is required'),
  date: Yup.string().required('Date is required'),
  income: Yup.number().required('Income is required'),
  expenses: Yup.number().required('Expenses is required'),
  profit: Yup.string().required('Profit is required')
});

const EditIncomeForm = () => {
  const [inspectors, setInspectors] = useState([]);

  const params = useParams();
  const [income, setIncome] = useState([]);
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
        navigate('/home')
      );
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

  const id = params.id;

  const fetchData = async () => {
    try {
      const result = await axios.get('http://localhost:3000/admin-portal/transport-management/' + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      setIncome(result.data);

      formik.setValues({
        routeId: result.data.incomeRouteID,
        busId: result.data.incomeBusID,
        load: result.data.incomeLoad,
        date: result.data.incomeDate,
        income: result.data.incomeIncome,
        expenses: result.data.incomeExpenses,
        profit: result.data.incomeProfit
      });
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
      console.log(error);
    }
  };

  const fetchInspectors = async () => {
    try {
      const response = await axios.get(API_URL + '/inspector', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      setInspectors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchInspectors();
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.patch(
          API_URL + '/' + id,
          {
            incomeRouteID: values.routeId,
            incomeBusID: values.busId,
            incomeLoad: values.load,
            incomeDate: values.date,
            incomeIncome: values.income,
            incomeExpenses: values.expenses,
            incomeProfit: values.profit
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
          title: 'Income Updated successfully!'
        });

        // Redirect to transport management page
        navigate('/transport-management');

        // Reset the form
        formik.resetForm();
      } catch (error) {
        console.log(error.response);
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
        if (error.response.status === 400 || error.response.status === 500) {
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
            {formik.touched.routeId && formik.errors.routeId ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.routeId}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="routeId"
            name="routeId"
            label="Route ID"
            value={formik.values.routeId || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.routeId && Boolean(formik.errors.routeId)}
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
            {formik.touched.load && formik.errors.load ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.load}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="load"
            name="load"
            label="Load"
            value={formik.values.load || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.load && Boolean(formik.errors.load)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.date && formik.errors.date ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.date}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="date"
            name="date"
            label="Date"
            value={formik.values.date || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.date && Boolean(formik.errors.date)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.income && formik.errors.income ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.income}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="income"
            name="income"
            label="Income"
            value={formik.values.income || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.income && Boolean(formik.errors.income)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.expenses && formik.errors.expenses ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.expenses}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="expenses"
            name="expenses"
            label="Expenses"
            value={formik.values.expenses || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.expenses && Boolean(formik.errors.expenses)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            {formik.touched.profit && formik.errors.profit ? (
              <p className="mt-1 mb-2 text-sm italic text-red-500">{formik.errors.profit}</p>
            ) : null}
          </div>
          <TextField
            fullWidth
            id="profit"
            name="profit"
            label="Profit"
            value={formik.values.profit || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.profit && Boolean(formik.errors.profit)}
          />
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
};
export default EditIncomeForm;
