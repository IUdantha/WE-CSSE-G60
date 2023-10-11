import styled from 'styled-components';
import { Box, Button, FormLabel, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddSupplierSContainer = styled.div`
  flex: 4;
`;

const SupplierSDetails = () => {
  const [inputs, setInputs] = useState([]);
  const id = useParams().id;
  console.log(id);
  const history = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:3000/admin-portal/supplierc/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.supplier));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:3000/admin-portal/supplierc/${id}`, {
        supplierID: String(inputs.supplierID),
        supplierName: String(inputs.supplierName),
        contactNumber: String(inputs.contactNumber),
        address: String(inputs.address),
        vehicleNumber: String(inputs.vehicleNumber)
      })
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history('/supplierc-management'));
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AddSupplierSContainer className="p-3 mb-[20px] bg-white rounded-xl h-99">
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
                <FormLabel>supplier ID</FormLabel>
                <TextField
                  value={inputs.supplierID}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="supplierID"
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

                <FormLabel>Address</FormLabel>
                <TextField
                  value={inputs.address}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="address"
                />

                <FormLabel>Vehicle Number</FormLabel>
                <TextField
                  value={inputs.vehicleNumber}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="vehicleNumber"
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
                  Update Supplier
                </Button>
              </Box>
            </form>
          )}
        </div>
      </div>
    </AddSupplierSContainer>
  );
};

export default SupplierSDetails;
