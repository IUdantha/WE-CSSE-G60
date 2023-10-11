import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Link } from '@mui/material';
import { MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddQuotationContainer = styled.div``;

const AddQuotation = () => {
  const [quotation, setQuotation] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetchsales from backend API
    axios
      .get('http://localhost:3000/admin-portal/sales-management/add', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        setQuotation(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Handle form submission to add a new Quotation
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Validate form inputs
    let errors = {};
    if (!event.target.name.value) {
      errors.name = 'Customer Name is required';
    }
    if (!event.target.email.value) {
      errors.email = 'Customer Email is required';
    }
    if (!event.target.date.value) {
      errors.date = 'Date is required';
    }
    if (!event.target.price.value) {
      errors.price = 'Price is required';
    }
    setFormErrors(errors);

    // Add form data to request body
    if (Object.keys(errors).length === 0) {
      const newQuotation = {
        name: event.target.name.value,
        email: event.target.email.value,
        date: event.target.date.value,
        price: event.target.price.value,
        producttyp: event.target.producttyp.value,
        packagetyp: event.target.packagetyp.value,
        weight: event.target.weight.value,
        status: event.target.status.value
      };

      axios
        .post('http://localhost:3000/admin-portal/sales-management/add', newQuotation, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then(() => {
          // Refresh products data after successful addition
          axios
            .get('http://localhost:3000/admin-portal/stock-management/add', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              }
            })
            .then((res) => {
              setQuotation(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });

      Swal.fire({
        icon: 'success',
        title: 'Quotation Added successfully!'
      });
      // Clear form inputs
      event.target.reset();
      setFormErrors({});
      navigate('/sales-management');
    }
  };

  return (
    <AddQuotationContainer className="p-10 mb-[20px] bg-white rounded-xl h-full">
      <Container>
        <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4 py-8 w-full mx-0">
          <TextField label="Customer Name" name="name" error={formErrors.name} />
          <TextField label="Customer Email" name="email" type="email" error={formErrors.email} />
          <TextField label="" name="date" type="date" error={formErrors.date} />
          <TextField label="Price" name="price" error={formErrors.price} type="number" />
          <Select labelId="type-lable" id="type-select" name="producttyp" select>
            {/* <option value="" selected>
              Select a Product Type
            </option> */}
            <MenuItem value="Tea">Tea</MenuItem>
            <MenuItem value="Coffee">Coffee</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          <Select labelId="type-lable" id="type-select" name="packagetyp" select>
            <MenuItem value="Can">Can</MenuItem>
            <MenuItem value="Packet">Packet</MenuItem>
            <MenuItem value="Bottle">Bottle</MenuItem>
            <MenuItem value="Tea Bags">Tea Bags</MenuItem>
          </Select>
          <Select labelId="type-lable" id="type-select" name="weight" select>
            <MenuItem value="100g">100g</MenuItem>
            <MenuItem value="125g">125g</MenuItem>
            <MenuItem value="150g">150g</MenuItem>
            <MenuItem value="200g">200g</MenuItem>
            <MenuItem value="500g">500g</MenuItem>
            <MenuItem value="1000g">1000g</MenuItem>
          </Select>
          <Select labelId="type-lable" id="type-select" name="status" select>
            <MenuItem value="New" style={{ color: 'red' }}>
              New
            </MenuItem>
            <MenuItem value="Processing" style={{ color: 'orange' }}>
              Processing
            </MenuItem>
            <MenuItem value="Done" style={{ color: 'green' }}>
              Done
            </MenuItem>
          </Select>
          <Link to="/sales-management">
            <Button type="submit" variant="contained" color="primary">
              Add Quotation
            </Button>
          </Link>
        </form>
      </Container>
    </AddQuotationContainer>
  );
};

export default AddQuotation;
