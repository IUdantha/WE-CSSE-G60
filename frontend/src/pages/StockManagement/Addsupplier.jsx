import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';

const AddSupplierContainer = styled.div``;

const AddSupplier = () => {
  const [supplier, setSupplier] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Fetch suppliers from backend API
    axios
      .get('http://localhost:3000/admin-portal/stock-management/addsupplier')
      .then((response) => {
        setSupplier(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Generate a random ID for the supplier
  const generateSupplierId = () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    return `SUP${randomNumber}`;
  };

  // Handle form submission to add a new supplier
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Validate form inputs
    let errors = {};
    if (!event.target.sname.value) {
      errors.sname = 'Supplier name is required';
    }
    if (!event.target.semail.value) {
      errors.semail = 'Supplier email is required';
    } else if (!/\S+@\S+\.\S+/.test(event.target.semail.value)) {
      errors.semail = 'Invalid email format';
    }
    if (!event.target.scontact.value) {
      errors.scontact = 'Supplier contact is required';
    } else if (!/^[0-9]+$/.test(event.target.scontact.value)) {
      errors.scontact = 'Supplier contact must contain only digits';
    } else if (event.target.scontact.value.length !== 10) {
      errors.scontact = 'Supplier contact must be exactly 10 digits';
    }
    if (!event.target.scompany.value) {
      errors.scompany = 'Supplier company is required';
    }
    setFormErrors(errors);

    // If form is valid, submit data to server
    if (Object.keys(errors).length === 0) {
      const newSupplier = {
        supID: generateSupplierId(),
        sname: event.target.sname.value,
        semail: event.target.semail.value,
        scontact: event.target.scontact.value,
        scompany: event.target.scompany.value
      };

      axios
        .post('http://localhost:3000/admin-portal/stock-management/addsupplier', newSupplier, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then(() => {
          // Refresh suppliers data after successful addition
          axios
            .get('http://localhost:3000/admin-portal/stock-management/addsupplier', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              }
            })
            .then((response) => {
              setSupplier(response.data);
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
      setFormErrors({});
    }
  };

  return (
    <AddSupplierContainer className="p-10 mb-[20px] bg-white rounded-xl h-full">
      <Container>
        <form
          onSubmit={handleFormSubmit}
          className="flex justify-between flex-col gap-4 py-8 w-full mx-0">
          <TextField label="Supplier ID" name="supID" value={generateSupplierId()} disabled />
          <TextField label="Supplier name" name="sname" error={formErrors.sname} />
          <TextField label="Supplier Email" name="semail" error={formErrors.semail} />
          <TextField label="Supplier contact" name="scontact" error={formErrors.scontact} />
          <TextField label="Supplier company" name="scompany" error={formErrors.scompany} />
          <Button type="submit" variant="contained" color="primary">
            Add Supplier
          </Button>
        </form>
      </Container>
    </AddSupplierContainer>
  );
};

export default AddSupplier;
