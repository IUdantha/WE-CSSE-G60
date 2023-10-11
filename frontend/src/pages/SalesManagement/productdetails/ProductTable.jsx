import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from '@mui/material';
// import { TextField } from '@mui/material';
// import CreateIcon from '@mui/icons-material/Create';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { ButtonGroup, Button } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { saveAs } from 'file-saver';
// import Header from '../../components/Header';

const ProductContainer = styled.div``;

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  useEffect(() => {
    axios
      .get('http://localhost:3000/admin-portal/production-management')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ProductContainer className="p-10 mb-[20px] bg-white rounded-xl h-full">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>{product.batchNumber}</TableCell>
                        <TableCell>{product.productName}</TableCell>
                        <TableCell>{product.quantityProduced}</TableCell>
                        <TableCell>
                          {new Date(product.productionDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(product.expirationDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{product.salesPrice}</TableCell>
                        <TableCell>
                          Raw Materials: {product.productionCost.rawMaterials} <br />
                          Labor: {product.productionCost.labor} <br />
                          Packing: {product.productionCost.packing} <br />
                          Other: {product.productionCost.other} <br />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[4, 10, 25, 50]}
                component="div"
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </ProductContainer>
  );
};

export default ProductDisplay;
