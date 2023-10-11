import styled from 'styled-components';
import { Box, Button, FormLabel, TextField, MenuItem, Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const AddMachineContainer = styled.div`
  flex: 4;
`;

const GeneratorDetails = () => {
  const [inputs, setInputs] = useState();
  const [open, setOpen] = useState(false);
  const id = useParams().id;
  console.log(id);
  const history = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:3000/admin-portal/machine-management/generators/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => res.data)
        .then((data) => setInputs(data.generator));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(
        `http://localhost:3000/admin-portal/machine-management/generators/${id}`,
        {
          generatorID: String(inputs.generatorID),
          sectionNumber: String(inputs.sectionNumber),
          Voltage: Number(inputs.Voltage),
          fuelNeed: Number(inputs.fuelNeed),
          maintainedTimes: Number(inputs.maintainedTimes),
          status: String(inputs.status)
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then((res) => {
        setOpen(true); // show snackbar on successful update
        return res.data;
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    // alert('machine updated ');
    setOpen(true); // show snackbar on successful update
    sendRequest().then(() => history('/machine-management/all-generators'));
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
    <AddMachineContainer className="p-3 mb-[20px] bg-white rounded-xl h-[89vh]">
      <Container>
        <div>
          <div className=" p-3 mb-[20px] bg-white rounded-xl h-99">
            {inputs && (
              <form onSubmit={handleSubmit}>
                <Box>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <FormLabel>GeneratorID</FormLabel>
                      <TextField
                        value={inputs.generatorID}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        name="generatorID"
                        disabled
                      />
                    </div>

                    <div>
                      <FormLabel>Section</FormLabel>
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
                      <FormLabel>Voltage(KW)</FormLabel>
                      <TextField
                        value={inputs.Voltage}
                        onChange={handleChange}
                        margin="normal"
                        type="number"
                        fullWidth
                        variant="outlined"
                        name="Voltage"
                      />
                    </div>

                    <div>
                      <FormLabel>Fuel Need(L)</FormLabel>
                      <TextField
                        value={inputs.fuelNeed}
                        onChange={handleChange}
                        margin="normal"
                        type="number"
                        fullWidth
                        variant="outlined"
                        name="fuelNeed"
                      />
                    </div>

                    <div>
                      <FormLabel>Maintained Times</FormLabel>
                      <TextField
                        value={inputs.maintainedTimes}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                        type="number"
                        variant="outlined"
                        name="maintainedTimes"
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
                          marginTop: '80px',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#777B7E'
                          },
                          width: '200px'
                        }}>
                        Update Generator
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
      </Container>
    </AddMachineContainer>
  );
};

export default GeneratorDetails;
