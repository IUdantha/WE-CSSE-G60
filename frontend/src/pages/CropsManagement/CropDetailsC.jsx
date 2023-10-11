import styled from 'styled-components';
import { Box, Button, FormLabel, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddCropContainer = styled.div`
  flex: 4;
`;

const CropDetails = () => {
  const [inputs, setInputs] = useState([]);
  const id = useParams().id;
  console.log(id);
  const history = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:3000/admin-portal/crops/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.crops));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:3000/admin-portal/crops/${id}`, {
        cropsID: String(inputs.cropsID),
        supplierName: String(inputs.supplierName),
        contactNumber: String(inputs.contactNumber),
        weight: String(inputs.weight),
        date: String(inputs.date)
      })
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history('/crops-management'));
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AddCropContainer className="p-3 mb-[20px] bg-white rounded-xl h-99">
      <div>
        <div className=" p-3 mb-[20px] bg-white rounded-xl h-99">
          {inputs && (
            <form onSubmit={handleSubmit}>
              <Box
                maxWidth={700}
                alignContent={'center'}
                alignSelf="center"
                marginLeft={'auto'}
                marginRight="auto"
                className="grid grid-cols-2 gap-0">
                <FormLabel>CropID</FormLabel>
                <TextField
                  value={inputs.cropsID}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="cropsID"
                  style={{ marginTop: '0' }}
                />

                <FormLabel>supplier Name</FormLabel>
                <TextField
                  value={inputs.supplierName}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="supplierName"
                />

                <FormLabel>contact Number</FormLabel>
                <TextField
                  value={inputs.contactNumber}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="contactNumber"
                />

                <FormLabel>weight</FormLabel>
                <TextField
                  value={inputs.weight}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="weight"
                />

                <FormLabel>date</FormLabel>
                <TextField
                  value={inputs.date}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="date"
                  type="date"
                />

                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: '#4CAF50',
                    marginTop: '40px',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#3E8E41'
                    },
                    width: '700px'
                  }}>
                  Update Crop
                </Button>
              </Box>
            </form>
          )}
        </div>
      </div>
    </AddCropContainer>
  );
};

export default CropDetails;
