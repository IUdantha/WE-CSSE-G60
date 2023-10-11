import { Button, FormLabel, TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MenuItem, Select } from '@mui/material';

const AddQuotationContainer = styled.div``;

const Update = () => {
  const [inputs, setInputs] = useState();
  const id = useParams().id;
  const history = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:3000/admin-portal/sales-management/getquotationid/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => res.data)
        .then((data) => setInputs(data.quotation));
    };

    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(
        `http://localhost:3000/admin-portal/sales-management/updatequo/${id}`,
        {
          name: String(inputs.name),
          email: String(inputs.email),
          date: Date(inputs.date),
          price: Number(inputs.price),
          producttyp: String(inputs.producttyp),
          packagetyp: String(inputs.packagetyp),
          weight: String(inputs.weight),
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

    Swal.fire({
      icon: 'success',
      title: 'Quotation Updated successfully!'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history('/sales-management'));
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AddQuotationContainer className="p-3 mb-[20px] bg-white rounded-xl h-full">
      <div>
        <div className=" p-10 mb-[20px] bg-white rounded-xl h-full">
          {inputs && (
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 py-8 w-full mx-0">
              <div>
                <FormLabel>Customer Name</FormLabel>
                <TextField
                  value={inputs.name}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="name"
                />
              </div>
              <div>
                <FormLabel>Customer Email</FormLabel>
                <TextField
                  value={inputs.email}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="email"
                  type="email"
                />
              </div>
              <div>
                <FormLabel>Price(RS.)</FormLabel>
                <TextField
                  value={inputs.price}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="price"
                  type="number"
                />
              </div>
              <div>
                <FormLabel>Product Type</FormLabel>
                <Select
                  labelId="type-lable"
                  id="type-select"
                  value={inputs.producttyp}
                  onChange={handleChange}
                  name="producttyp"
                  select
                  variant="outlined"
                  margin="normal"
                  fullWidth>
                  <MenuItem value="Tea">Tea</MenuItem>
                  <MenuItem value="Coffee">Coffee</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </div>
              <div>
                <FormLabel>Package Name</FormLabel>
                <Select
                  labelId="type-lable"
                  id="type-select"
                  name="packagetyp"
                  select
                  value={inputs.packagetyp}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined">
                  <MenuItem value="Can">Can</MenuItem>
                  <MenuItem value="Packet">Packet</MenuItem>
                  <MenuItem value="Bottle">Bottle</MenuItem>
                  <MenuItem value="Tea Bags">Tea Bags</MenuItem>
                </Select>
              </div>
              <div>
                <FormLabel>Weight</FormLabel>
                <Select
                  labelId="type-lable"
                  id="type-select"
                  name="weight"
                  select
                  value={inputs.weight}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined">
                  <MenuItem value="100g">100g</MenuItem>
                  <MenuItem value="125g">125g</MenuItem>
                  <MenuItem value="150g">150g</MenuItem>
                  <MenuItem value="200g">200g</MenuItem>
                  <MenuItem value="500g">500g</MenuItem>
                  <MenuItem value="1000g">1000g</MenuItem>
                </Select>
              </div>
              <div>
                <FormLabel>Status</FormLabel>
                <Select
                  labelId="type-lable"
                  id="type-select"
                  name="status"
                  select
                  value={inputs.status}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined">
                  <MenuItem value="New" style={{ color: 'red' }}>
                    New
                  </MenuItem>
                  <MenuItem value="Processing" style={{ color: 'orange' }}>
                    Processing
                  </MenuItem>
                  <MenuItem value="Done" style={{ color: 'green' }}>
                    Done
                  </MenuItem>
                </Select>
              </div>
              <div className="mt-10">
                <Button variant="contained" type="submit" margin="normal" fullWidth>
                  Update Supplier
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </AddQuotationContainer>
  );
};

export default Update;
