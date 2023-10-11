import styled from 'styled-components';
import { Box, Button, FormLabel, TextField, MenuItem } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const AddMachineContainer = styled.div`
  flex: 4;
`;

const MachineDetails = () => {
  const [inputs, setInputs] = useState();
  const [open, setOpen] = useState(false);
  const id = useParams().id;
  console.log(id);
  const history = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:3000/admin-portal/machine-management/machines/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => res.data)
        .then((data) => setInputs(data.machine));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(
        `http://localhost:3000/admin-portal/machine-management/machines/${id}`,
        {
          machineID: String(inputs.machineID),
          machineModel: String(inputs.machineModel),
          sectionNumber: String(inputs.sectionNumber),
          brand: String(inputs.brand),
          maintenanceCost: Number(inputs.maintenanceCost),
          lastModifiedDate: new Date(inputs.lastModifiedDate),
          status: String(inputs.status)
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    setOpen(true); // show snackbar on successful update
    sendRequest().then(() => history('/machine-management'));
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AddMachineContainer className="p-3 mb-[20px] bg-white rounded-xl h-99">
      <div>
        <div className=" p-3 mb-[20px] bg-white rounded-xl h-99">
          {inputs && (
            <form onSubmit={handleSubmit}>
              <Box>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <FormLabel>Machine Register Number</FormLabel>
                    <TextField
                      value={inputs.machineID}
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                      variant="outlined"
                      name="machineID"
                      disabled
                    />
                  </div>

                  <div>
                    <FormLabel>Machine Model</FormLabel>
                    <TextField
                      value={inputs.machineModel}
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                      variant="outlined"
                      name="machineModel"
                    />
                  </div>

                  <div>
                    <FormLabel>Section Number</FormLabel>
                    <TextField
                      value={inputs.sectionNumber}
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                      select
                      variant="outlined"
                      name="sectionNumber">
                      <MenuItem value="withering section">withering section</MenuItem>
                      <MenuItem value="rolling section">rolling section</MenuItem>
                      <MenuItem value="fermentation section">fermentation section</MenuItem>
                      <MenuItem value="drying section">drying section</MenuItem>
                      <MenuItem value="sorting section">sorting section</MenuItem>
                    </TextField>
                  </div>

                  <div>
                    <FormLabel>Brand</FormLabel>
                    <TextField
                      value={inputs.brand}
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                      variant="outlined"
                      name="brand"
                    />
                  </div>

                  <div>
                    <FormLabel>Maintenance Cost</FormLabel>
                    <TextField
                      value={inputs.maintenanceCost}
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                      variant="outlined"
                      type="number"
                      name="maintenanceCost"
                    />
                  </div>

                  <div>
                    <FormLabel>Last Modified Date -</FormLabel>
                    <FormLabel>
                      {inputs.lastModifiedDate &&
                        new Date(inputs.lastModifiedDate).toLocaleDateString('en-US', {
                          timeZone: 'UTC'
                        })}
                    </FormLabel>
                    <TextField
                      value={inputs.lastModifiedDate}
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                      type="date"
                      variant="outlined"
                      name="lastModifiedDate"
                    />
                  </div>

                  <div>
                    <FormLabel>status</FormLabel>
                    <TextField
                      value={inputs.status}
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                      select
                      variant="outlined"
                      name="status">
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </TextField>
                  </div>
                  <div className="col-span-2 flex flex-row justify-end ">
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        backgroundColor: '#000000',
                        marginTop: '40px',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#777B7E'
                        },
                        width: '200px'
                      }}>
                      Update Machine
                    </Button>
                  </div>
                </div>
              </Box>
            </form>
          )}
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Generator Updated successfully!
        </MuiAlert>
      </Snackbar>
    </AddMachineContainer>
  );
};

export default MachineDetails;
