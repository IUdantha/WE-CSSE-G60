import React, { useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductTable = ({ products }) => {
  const [product, setProducts] = useState([]);
  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:3000/admin-portal/product-management/${productId}`)
      .then(() => {
        setProducts(product.filter((product) => product._id !== productId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Flavour</TableCell>
            <TableCell>Quality Control Info</TableCell>
            <TableCell>Certifications</TableCell>
            <TableCell>Inventory Status</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Package Type</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Barcode</TableCell>
            <TableCell>Serial Number</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.productCode}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>{product.flavour}</TableCell>
              <TableCell>{product.qualityControlInformation}</TableCell>
              <TableCell>{product.certifications}</TableCell>
              <TableCell>{product.inventoryStatus}</TableCell>
              <TableCell>
                <img src={product.image} alt={product.productName} />
              </TableCell>
              <TableCell>{product.packageType}</TableCell>
              <TableCell>{product.weight}</TableCell>
              <TableCell>{product.barcode}</TableCell>
              <TableCell>{product.serialNumber}</TableCell>
              {/* onClick={() => deleteProduct(product._id)} */}
              <TableCell>
                <IconButton aria-label="delete" onClick={() => handleDelete(product._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
