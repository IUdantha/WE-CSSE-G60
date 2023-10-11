import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Container,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const AddProductionContainer = styled.div``;

const AddProduction = () => {
  const [products, setProducts] = useState([]);
  const [productNameFilter, setProductNameFilter] = useState('');
  const [productionDateFilter, setProductionDateFilter] = useState('');

  useEffect(() => {
    // Fetch products from backend API
    axios
      .get('http://localhost:3000/admin-portal/production-management')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Handle form submission to add a new product
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Add form data to request body
    const newProduct = {
      productName: event.target.productName.value,
      productCode: event.target.productCode.value,
      type: event.target.type.value,
      flavour: event.target.flavour.value,
      qualityControlInformation: event.target.qualityControlInformation.value,
      certifications: event.target.certifications.value,
      inventoryStatus: event.target.inventoryStatus.value,
      image: event.target.image.value,
      packageType: event.target.packageType.value,
      weight: event.target.weight.value,
      barcode: event.target.barcode.value,
      serialNumber: event.target.serialNumber.value
    };

    axios
      .post('http://localhost:3000/admin-portal/product-management', newProduct)
      .then(() => {
        // Refresh products data after successful addition
        axios
          .get('http://localhost:3000/admin-portal/product-management')
          .then((response) => {
            setProducts(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    // Clear form inputs
    event.target.reset();
  };

  return (
    <AddProductionContainer className="p-10 mb-[20px] bg-white rounded-xl h-[78vh]">
      <Container>
        <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4 py-8 w-full mx-0">
          <TextField label="Product Name" name="productName" />
          <TextField label="Product Code" name="productCode" />
          <InputLabel id="type-label" className="col-span-2">
            Type
          </InputLabel>
          <Select labelId="type-label" id="type-select" name="type" select>
            <MenuItem value="tea">Tea</MenuItem>
            <MenuItem value="coffee">Coffee</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          {/* <TextField label="type" name="type" /> */}
          <TextField label="Flavour" name="flavour" />
          <TextField label="Quality Control Information" name="qualityControlInformation" />
          <TextField label="Certifications" name="certifications" />
          <TextField label="Inventory Status" name="inventoryStatus" />
          <TextField label="Image" name="image" />
          <TextField label="Package Type" name="packageType" />
          <TextField label="Weight" name="weight" />
          <TextField label="Barcode" name="barcode" />
          <TextField label="Serial Number" name="serialNumber" type="number" />
          <div className="col-span-2 flex flex-row justify-end ">
            <Button
              className=""
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: '#85C20D' }}>
              Add Product
            </Button>
          </div>
        </form>
      </Container>
    </AddProductionContainer>
  );
};

export default AddProduction;
