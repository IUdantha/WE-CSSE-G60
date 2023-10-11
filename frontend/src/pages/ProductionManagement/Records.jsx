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
  Container
} from '@mui/material';

const Productions = () => {
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
      })
      .catch((error) => {
        console.log(error);
      });

    // Clear form inputs
    event.target.reset();
  };

  // Handle delete button click to delete a product
  const handleDeleteProduct = (id) => {
    // Send DELETE request to backend API to delete product by ID
    axios
      .delete('http://localhost:3000/admin-portal/production-management/${id}')
      .then(() => {
        // Refresh products data after successful deletion
        axios
          .get('http://localhost:3000/admin-portal/production-management')
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
  };

  // Handle filter by product name
  const handleFilterByProductName = (event) => {
    setProductNameFilter(event.target.value);
  };

  // Handle filter by production date
  const handleFilterByProductionDate = (event) => {
    setProductionDateFilter(event.target.value);
  };

  // Filter products by product name and production date
  const filteredProducts = products.filter((product) => {
    return (
      product.productName.toLowerCase().includes(productNameFilter.toLowerCase()) &&
      new Date(product.productionDate).toLocaleDateString().includes(productionDateFilter)
    );
  });

  return (
    <Container>
      <form
        onSubmit={handleFormSubmit}
        className="flex justify-between flex-col gap-4 py-8 w-full mx-0">
        <TextField label="Batch Number" name="batchNumber" />
        <TextField label="Product Name" name="productName" />
        <TextField label="Quantity Produced" name="quantityProduced" />
        <TextField label="Production Date" name="productionDate" type="date" />
        <TextField label="Expiration Date" name="expirationDate" type="date" />
        <TextField label="Sales Price" name="salesPrice" />
        <TextField label="Raw Materials Cost" name="rawMaterials" />
        <TextField label="Labor Cost" name="labor" />
        <TextField label="Packing Cost" name="packing" />
        <TextField label="Other Cost" name="other" />
        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
      </form>

      <div className="py-8">
        <TextField
          label="Filter by Product Name"
          value={productNameFilter}
          onChange={handleFilterByProductName}
        />
        <TextField
          label="Filter by Production Date"
          value={productionDateFilter}
          onChange={handleFilterByProductionDate}
          type="date"
        />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Batch Number</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity Produced</TableCell>
              <TableCell>Production Date</TableCell>
              <TableCell>Expiration Date</TableCell>
              <TableCell>Sales Price</TableCell>
              <TableCell>Production Cost</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.batchNumber}</TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.quantityProduced}</TableCell>
                <TableCell>{new Date(product.productionDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(product.expirationDate).toLocaleDateString()}</TableCell>
                <TableCell>{product.salesPrice}</TableCell>
                <TableCell>
                  <ul>
                    <li>Raw Materials: {product.productionCost.rawMaterials}</li>
                    <li>Labor: {product.productionCost.labor}</li>
                    <li>Packing: {product.productionCost.packing}</li>
                    <li>Other: {product.productionCost.other}</li>
                  </ul>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteProduct(product._id)}>
                    update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteProduct(product._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Productions;
