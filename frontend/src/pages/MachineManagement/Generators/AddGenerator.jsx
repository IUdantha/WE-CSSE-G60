import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Snackbar, MenuItem, Select } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const AddGeneratorContainer = styled.div`
  flex: 5;
`;

const AddGenerator = () => {
  const [generators, setGenerators] = useState([]);
  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Fetch generators from backend API
    axios
      .get('http://localhost:3000/admin-portal/machine-management/generators', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        setGenerators(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Generate a random ID for the supplier
  const generateMachineId = () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    return `Gen-${randomNumber}`;
  };

  // Handle form submission to add a new generator
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    // Validate form inputs
    const errors = {};
    // if (!form.generatorID.value) {
    //   errors.generatorID = 'Generator Regsitration Number is required';
    // }
    if (!form.sectionNumber.value) {
      errors.sectionNumber = 'Section Name is required';
    }
    if (!form.Voltage.value) {
      errors.Voltage = 'Voltage is required';
    }
    if (!form.fuelNeed.value) {
      errors.fuelNeed = 'Fuel is required';
    }
    if (!form.maintainedTimes.value) {
      errors.maintainedTimes = 'Maintained Times is required';
    }
    if (!form.status.value) {
      errors.status = 'Status is required';
    }
    setFormErrors(errors);
    // If there are no errors, add machine to the database
    if (Object.keys(errors).length === 0) {
      // Add form data to request body
      const newGenerator = {
        generatorID: generateMachineId(),
        sectionNumber: event.target.sectionNumber.value,
        Voltage: event.target.Voltage.value,
        fuelNeed: event.target.fuelNeed.value,
        maintainedTimes: event.target.maintainedTimes.value,
        status: event.target.status.value
      };

      axios
        .post('http://localhost:3000/admin-portal/machine-management/generators', newGenerator, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then(() => {
          // Refresh products data after successful addition
          axios
            .get('http://localhost:3000/admin-portal/machine-management/generators', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              }
            })
            .then((response) => {
              setGenerators(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
          setOpen(true);
        })
        .catch((error) => {
          console.log(error);
        });

      // Clear form inputs
      event.target.reset();
      setFormErrors({});
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AddGeneratorContainer className="p-10 mb-[20px] bg-white rounded-2xl h-[89vh]">
      <Container>
        <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4 py-8 w-full mx-0">
          <TextField
            label="Generator Register Number"
            name="generatorID"
            value={generateMachineId()}
            disabled
          />
          <TextField
            fullWidth
            select
            label="Section"
            name="sectionNumber"
            error={Boolean(formErrors.sectionNumber)}
            helperText={formErrors.sectionNumber}>
            <MenuItem value="withering section">withering section</MenuItem>
            <MenuItem value="rolling section">rolling section</MenuItem>
            <MenuItem value="fermentation section">fermentation section</MenuItem>
            <MenuItem value="drying section">drying section</MenuItem>
            <MenuItem value="sorting section">sorting section</MenuItem>
          </TextField>
          <TextField
            label="Voltage(KW)"
            name="Voltage"
            type="number"
            error={Boolean(formErrors.Voltage)}
            helperText={formErrors.Voltage}
          />
          <TextField
            label="Fuel Need(L)"
            name="fuelNeed"
            type="number"
            error={Boolean(formErrors.fuelNeed)}
            helperText={formErrors.fuelNeed}
          />
          <TextField
            label="Maintained Times"
            name="maintainedTimes"
            type="number"
            error={Boolean(formErrors.maintainedTimes)}
            helperText={formErrors.maintainedTimes}
          />
          <TextField
            fullWidth
            select
            label="status"
            name="status"
            error={Boolean(formErrors.status)}
            helperText={formErrors.status}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>

          <div className="col-span-2 flex flex-row justify-end ">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: '#000000',
                '&:hover': {
                  backgroundColor: '#777B7E'
                },
                '&:active': {
                  backgroundColor: '#000000'
                }
              }}>
              Add Generator
            </Button>
          </div>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
            Generator added successfully!
          </MuiAlert>
        </Snackbar>
      </Container>
    </AddGeneratorContainer>
  );
};

export default AddGenerator;
