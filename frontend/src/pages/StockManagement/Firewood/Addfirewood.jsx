import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';

const AddFirewoodContainer = styled.div``;

const AddFirewood = () => {
  const [firewood, setFirewood] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch products from backend API
    axios
      .get('http://localhost:3000/admin-portal/stock-management/addfirewoodstock', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        setFirewood(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Validate form inputs
  const validateInputs = (values) => {
    let errors = {};
    if (!values.supID) {
      errors.supID = 'Supplier ID is required';
    }
    if (!values.itemType) {
      errors.itemType = 'Wood type is required';
    }
    if (!values.quantity) {
      errors.quantity = 'Quantity is required';
    } else if (isNaN(values.quantity)) {
      errors.quantity = 'Quantity must be a number';
    }
    if (!values.price) {
      errors.price = 'Price is required';
    } else if (isNaN(values.price)) {
      errors.price = 'Price must be a number';
    }
    return errors;
  };

  // Handle form submission to add a new product
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Validate inputs
    const newFirewood = {
      supID: event.target.supID.value,
      itemType: event.target.itemType.value,
      quantity: event.target.quantity.value,
      price: event.target.price.value
    };
    const errors = validateInputs(newFirewood);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      axios
        .post('http://localhost:3000/admin-portal/stock-management/addfirewoodstock', newFirewood, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then(() => {
          // Refresh products data after successful addition
          axios
            .get('http://localhost:3000/admin-portal/stock-management/addfirewoodstock', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              }
            })
            .then((response) => {
              setFirewood(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });

      // Clear form inputs
      event.target.reset();
    }
  };

  return (
    <AddFirewoodContainer className="p-10 mb-[20px] bg-white rounded-xl h-full">
      <Container>
        <form
          onSubmit={handleFormSubmit}
          className="flex justify-between flex-col gap-4 py-8 w-full mx-0">
          <TextField
            label="Supplier ID"
            name="supID"
            error={errors.supID}
            helperText={errors.supID}
          />
          <TextField
            label="Wood type"
            name="itemType"
            error={errors.itemType}
            helperText={errors.itemType}
          />
          <TextField
            label="Quantity"
            name="quantity"
            error={errors.quantity}
            helperText={errors.quantity}
          />
          <TextField label="Price" name="price" error={errors.price} helperText={errors.price} />
          <Button type="submit" variant="contained" color="primary">
            Add Firewood stock
          </Button>
        </form>
      </Container>
    </AddFirewoodContainer>
  );
};

export default AddFirewood;
