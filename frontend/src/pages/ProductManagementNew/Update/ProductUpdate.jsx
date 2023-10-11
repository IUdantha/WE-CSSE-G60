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
        .get(`http://localhost:3000/admin-portal/product-management/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.production));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:3000/admin-portal/product-management/${id}`, {
        productName: String(inputs.productName),
        productCode: String(inputs.productCode),
        type: String(inputs.type),
        flavour: String(inputs.batchNumber),
        qualityControlInformation: String(inputs.qualityControlInformation),
        certifications: String(inputs.certifications),
        inventoryStatus: String(inputs.inventoryStatus),
        image: String(inputs.image),
        packageType: String(inputs.packageType),
        weight: String(inputs.weight),
        barcode: String(inputs.barcode),
        serialNumber: String(inputs.serialNumber)
      })
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history('/products-management'));
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProductUpdateContainer className="p-16 mb-[20px] bg-white rounded-2xl h-[89vh]">
      <div>
        <div className="">
          {inputs && (
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 py-8 w-full mx-0">
              <TextField
                label="productName"
                name="productName"
                onChange={handleChange}
                value={inputs.productName}
              />
              <TextField
                label="Product Code"
                name="productCode"
                onChange={handleChange}
                value={inputs.productName}
              />
              <TextField
                label="type"
                name="type"
                onChange={handleChange}
                value={inputs.productName}
              />
              <TextField
                label="flavour"
                name="flavour"
                onChange={handleChange}
                value={inputs.productName}
              />
              <TextField
                label="qualityControlInformation"
                name="qualityControlInformation"
                onChange={handleChange}
                value={inputs.productName}
              />
              <TextField
                label="certifications"
                name="certifications"
                onChange={handleChange}
                value={inputs.productName}
              />
              <TextField
                label="inventoryStatus"
                name="inventoryStatus"
                onChange={handleChange}
                value={inputs.productName}
              />
              <TextField
                label="image"
                name="image"
                onChange={handleChange}
                value={inputs.productName}
              />
              <TextField
                label="packageType"
                name="packageType"
                onChange={handleChange}
                value={inputs.productName}
              />
              <TextField
                label="weight"
                name="weight"
                onChange={handleChange}
                value={inputs.productName}
              />
              <TextField
                label="barcode"
                name="barcode"
                onChange={handleChange}
                value={inputs.productName}
              />
              <TextField
                label="serialNumber"
                name="serialNumber"
                onChange={handleChange}
                value={inputs.productName}
              />
              <div className="col-span-2 flex flex-row justify-end ">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: '#85C20D' }}>
                  Update Product
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </ProductUpdateContainer>
  );
};

export default ProductUpdate;
