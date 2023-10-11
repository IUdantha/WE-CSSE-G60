import { Box, Button, FormLabel, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PackingDetails = () => {
  const [inputs, setInputs] = useState();
  const id = useParams().id;
  console.log(id);
  const history = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:3000/admin-portal/stock-management/getpackingmaterialstockid/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.packing));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:3000/admin-portal/stock-management/editpackingmaterialstock/${id}`, {
        quantity: String(inputs.quantity)
      })
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history('/stock-management/packing'));
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div>
      <div className=" p-10 mb-[20px] bg-white rounded-xl h-full">
        {inputs && (
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent={'center'}
              maxWidth={700}
              alignContent={'center'}
              alignSelf="center"
              marginLeft={'auto'}
              marginRight="auto"
              marginTop={10}>
              <FormLabel>Quantity</FormLabel>
              <TextField
                value={inputs.quantity}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="quantity"
              />

              <Button variant="contained" type="submit">
                Update Supplier
              </Button>
            </Box>
          </form>
        )}
      </div>
    </div>
  );
};

export default PackingDetails;
