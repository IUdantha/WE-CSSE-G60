import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Snackbar,
  Select,
  MenuItem
  // RadioGroup,
  // Radio,
  // FormLabel,
  // FormControlLabel
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const AddMachineContainer = styled.div``;

const AddMachine = () => {
  const [machines, setMachines] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Fetch machines from backend API
    axios
      .get('http://localhost:3000/admin-portal/machine-management/machines', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        setMachines(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Generate a random ID for the supplier
  const generateMachineId = () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    return `Mac-${randomNumber}`;
  };

  // Handle form submission to add a new product
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const errors = {};
    if (!form.sectionNumber.value) {
      errors.sectionNumber = 'Section Number is required';
    }
    if (!form.machineModel.value) {
      errors.machineModel = 'Machine Model is required';
    }
    if (!form.brand.value) {
      errors.brand = 'Brand is required';
    }
    if (!form.lastModifiedDate.value) {
      errors.lastModifiedDate = 'Last Modified Date is required';
    }
    if (!form.maintenanceCost.value) {
      errors.maintenanceCost = 'Mainteanance Cost is required';
    }
    if (!form.status.value) {
      errors.status = 'Status is required';
    }
    setFormErrors(errors);

    const machineID = generateMachineId();
    const machineModel = form.machineModel.value.trim();
    const sectionNumber = form.sectionNumber.value.trim();
    const brand = form.brand.value.trim();
    const maintenanceCost = parseFloat(form.maintenanceCost.value.trim());
    const lastModifiedDate = form.lastModifiedDate.value.trim();
    const status = form.status.value.trim();

    // Validate form fields
    // if (
    //   !machineID ||
    //   !machineModel ||
    //   !sectionNumber ||
    //   !brand ||
    //   isNaN(maintenanceCost) ||
    //   !lastModifiedDate ||
    //   !status
    // ) {
    //   window.alert(
    //     'Please fill out all the form fields and ensure that the maintenance cost field contains a number.'
    //   );
    //   return;
    // }

    if (Object.keys(errors).length === 0) {
      const newMachine = {
        machineID,
        machineModel,
        sectionNumber,
        brand,
        maintenanceCost,
        lastModifiedDate,
        status
      };

      axios
        .post('http://localhost:3000/admin-portal/machine-management/machines', newMachine, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then(() => {
          // Refresh machines data after successful addition
          axios
            .get('http://localhost:3000/admin-portal/machine-management/machines', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              }
            })
            .then((response) => {
              setMachines(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
          setOpen(true);
          navigate.push('/machine-management');
        })
        .catch((error) => {
          console.log(error);
        });

      // Clear form inputs
      form.reset();
      setFormErrors({});
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AddMachineContainer className="p-10 mb-[20px] bg-white rounded-2xl h-[89vh]">
      <Container>
        <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4 py-8 w-full mx-0">
          <TextField
            label="Machine Register Number"
            name="machineID"
            value={generateMachineId()}
            disabled
          />

          <TextField
            label="Machine Model"
            name="machineModel"
            error={Boolean(formErrors.machineModel)}
            helperText={formErrors.machineModel}
          />
          <TextField
            fullWidth
            select
            label="Section Number"
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
            label="Brand"
            name="brand"
            error={Boolean(formErrors.brand)}
            helperText={formErrors.brand}
          />
          <TextField
            label="Maintenance Cost"
            name="maintenanceCost"
            type="number"
            error={Boolean(formErrors.maintenanceCost)}
            helperText={formErrors.maintenanceCost}
          />
          <TextField
            label="Last Modified Date"
            name="lastModifiedDate"
            type="date"
            error={Boolean(formErrors.lastModifiedDate)}
            helperText={formErrors.lastModifiedDate}
          />
          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            error={Boolean(formErrors.status)}
            helperText={formErrors.status}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
          {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group">
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup> */}
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
              ADD MACHINE
            </Button>
          </div>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
            Machine added successfully!
          </MuiAlert>
        </Snackbar>
      </Container>
    </AddMachineContainer>
  );
};

export default AddMachine;
