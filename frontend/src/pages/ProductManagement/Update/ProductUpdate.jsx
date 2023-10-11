import styled from 'styled-components';
import { Box, Button, FormLabel, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductUpdateContainer = styled.div`
  flex: 4;
`;

const ProductUpdate = () => {
  const [inputs, setInputs] = useState({});
  const { id } = useParams().id;
  console.log(id);
  const history = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:3000/admin-portal/production-management/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.production));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:3000/admin-portal/production-management/${id}`, {
        batchNumber: String(inputs.batchNumber),
        productName: String(inputs.productName),
        quantityProduced: Number(inputs.quantityProduced),
        productionDate: Date(inputs.productionDate),
        expirationDate: Date(inputs.expirationDate),
        salesPrice: Number(inputs.salesPrice),
        productionCost: {
          rawMaterials: Number(inputs.rawMaterials),
          labor: Number(inputs.labor),
          packing: Number(inputs.packing),
          other: Number(inputs.other)
        }
      })
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history('/product-management'));
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProductUpdateContainer className="p-3 mb-[20px] bg-white rounded-2xl h-[89vh]">
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
                className="grid grid-cols-2 gap-4">
                <div className="">
                  <FormLabel>Batch Number</FormLabel>
                  <TextField
                    value={inputs.batchNumber}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    name="batchNumber"
                  />
                </div>

                <div className="">
                  <FormLabel>Product Name</FormLabel>
                  <TextField
                    value={inputs.productName}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    name="productName"
                  />
                </div>

                <div className="">
                  <FormLabel>Quantity Produced</FormLabel>
                  <TextField
                    value={inputs.quantityProduced}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    name="quantityProduced"
                  />
                </div>

                <div className="">
                  <FormLabel>Production Date</FormLabel>
                  <TextField
                    value={inputs.productionDate}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    name="productionDate"
                  />
                </div>

                <div className="">
                  <FormLabel>Expiration Date</FormLabel>
                  <TextField
                    value={inputs.expirationDate}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    name="expirationDate"
                  />
                </div>

                <div className="">
                  <FormLabel>Sales Price</FormLabel>
                  <TextField
                    value={inputs.salesPrice}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    name="salesPrice"
                  />
                </div>

                <div className="">
                  <FormLabel>Production Cost</FormLabel>
                  <TextField
                    value={inputs.productionCost}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    name="productionCost"
                  />
                </div>

                <div className="col-span-2 flex flex-row justify-end ">
                  <Button variant="contained" type="submit" style={{ backgroundColor: '#85C20D' }}>
                    Update Product
                  </Button>
                </div>
              </Box>
            </form>
          )}
        </div>
      </div>
    </ProductUpdateContainer>
  );
};

export default ProductUpdate;
