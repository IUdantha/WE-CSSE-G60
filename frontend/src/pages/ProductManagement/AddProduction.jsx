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
  Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const AddProductionContainer = styled.div``;

const AddProduction = () => {
  const [products, setProducts] = useState([]);
  const [productNameFilter, setProductNameFilter] = useState('');
  const [productionDateFilter, setProductionDateFilter] = useState('');
  const [open, setOpen] = useState(false);

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
      batchNumber: event.target.batchNumber.value,
      productName: event.target.productName.value,
      quantityProduced: event.target.quantityProduced.value,
      productionDate: event.target.productionDate.value,
      expirationDate: event.target.expirationDate.value,
      salesPrice: event.target.salesPrice.value,
      productionCost: {
        rawMaterials: event.target.rawMaterials.value,
        labor: event.target.labor.value,
        packing: event.target.packing.value,
        other: event.target.other.value
      }
    };

    axios
      .post('http://localhost:3000/admin-portal/production-management', newProduct)
      .then(() => {
        // Refresh products data after successful addition
        axios
          .get('http://localhost:3000/admin-portal/production-management')
          .then((response) => {
            setProducts(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });

    // Clear form inputs
    event.target.reset();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AddProductionContainer className="p-10 mb-[20px] bg-white rounded-2xl h-[78vh]">
      <Container>
        <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4 py-8 w-full mx-0">
          <TextField required label="Batch Number" name="batchNumber" />
          <TextField required label="Product Name" name="productName" />
          <TextField required label="Quantity Produced" name="quantityProduced" />
          <TextField required label="Production Date" name="productionDate" type="date" />
          <TextField required label="Expiration Date" name="expirationDate" type="date" />
          <TextField required label="Sales Price" name="salesPrice" type="number" />
          <TextField required label="Raw Materials Cost" name="rawMaterials" type="number" />
          <TextField required label="Labor Cost" name="labor" type="number" />
          <TextField required label="Packing Cost" name="packing" type="number" />
          <TextField required label="Other Cost" name="other" type="number" />
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
            Production added successfully!
          </MuiAlert>
        </Snackbar>
      </Container>
    </AddProductionContainer>
  );
};

export default AddProduction;
