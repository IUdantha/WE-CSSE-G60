import { Box, Button, FormLabel, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SupplierDetails = () => {
  const [inputs, setInputs] = useState();
  const id = useParams().id;
  console.log(id);
  const history = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:3000/admin-portal/stock-management/getsupplierid/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => res.data)
        .then((data) => setInputs(data.supplier));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(
        `http://localhost:3000/admin-portal/stock-management/editsupplier/${id}`,
        {
          supID: String(inputs.supID),
          sname: String(inputs.sname),
          semail: String(inputs.semail),
          scontact: String(inputs.scontact),
          scompany: String(inputs.scompany)
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
    sendRequest().then(() => history('/stock-management'));
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));

    console.log(e.target.name);
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
              <FormLabel>Supplier ID</FormLabel>
              <TextField
                value={inputs.supID}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="supID"
              />

              <FormLabel>Supplier name</FormLabel>
              <TextField
                value={inputs.sname}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="sname"
              />

              <FormLabel>Supplier email</FormLabel>
              <TextField
                value={inputs.semail}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="semail"
              />

              <FormLabel>Supplier contact</FormLabel>
              <TextField
                value={inputs.scontact}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="scontact"
              />

              <FormLabel>Supplier company</FormLabel>
              <TextField
                value={inputs.scompany}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="scompany"
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

export default SupplierDetails;
