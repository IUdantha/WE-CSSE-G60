import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';

const AddPackingitemsContainer = styled.div``;

const Addpacking = () => {
  const [packing, setPacking] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch packing items from backend API
    axios
      .get('http://localhost:3000/admin-portal/stock-management/addpackingmaterialstock', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        setPacking(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Handle form submission to add a new packing item
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Validate form inputs
    const errors = {};
    if (!event.target.supID.value.trim()) {
      errors.supID = 'Supplier ID is required';
    }
    if (!event.target.itemType.value.trim()) {
      errors.itemType = 'Packing type is required';
    }
    if (!event.target.quantity.value.trim()) {
      errors.quantity = 'Quantity is required';
    } else if (isNaN(event.target.quantity.value.trim())) {
      errors.quantity = 'Quantity must be a number';
    }
    if (!event.target.price.value.trim()) {
      errors.price = 'Price is required';
    } else if (isNaN(event.target.price.value.trim())) {
      errors.price = 'Price must be a number';
    }
    setErrors(errors);

    // If there are no validation errors, add the packing item
    if (Object.keys(errors).length === 0) {
      // Add form data to request body
      const newPacking = {
        supID: event.target.supID.value,
        itemType: event.target.itemType.value,
        quantity: event.target.quantity.value,
        price: event.target.price.value
      };

      axios
        .post(
          'http://localhost:3000/admin-portal/stock-management/addpackingmaterialstock',
          newPacking,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          }
        )
        .then(() => {
          // Refresh packing items data after successful addition
          axios
            .get('http://localhost:3000/admin-portal/stock-management/addpackingmaterialstock', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              }
            })
            .then((response) => {
              setPacking(response.data);
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
    <AddPackingitemsContainer className="p-10 mb-[20px] bg-white rounded-xl h-full">
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
            label="Packing type"
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
            Add Packing Item stock
          </Button>
        </form>
      </Container>
    </AddPackingitemsContainer>
  );
};

export default Addpacking;
