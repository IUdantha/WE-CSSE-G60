import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  TablePagination,
  Button
  // Dialog,
  // DialogTitle,
  // DialogContent,
  // DialogActions,
  // InputLabel,
  // Select,
  // MenuItem,
  // Box
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
const URL = 'http://localhost:3000/admin-portal/production-management';

const ProductList = () => {
  const history = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  // const [selectedProduct, setSelectedProduct] = useState(null);
  // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  // const [batchNumber, setBatchNumber] = useState('');
  // const [productName, setProductName] = useState('');
  // const [quantityProduced, setQuantityProduced] = useState('');
  // const [productionDate, setProductionDate] = useState('');
  // const [expirationDate, setExpirationDate] = useState('');
  // const [salesPrice, setSalesPrice] = useState('');
  // const [rawMaterials, setRawMaterials] = useState('');
  // const [labor, setLabor] = useState('');
  // const [packing, setPacking] = useState('');
  // const [other, setOther] = useState('');

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

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleUpdate = (id) => {
    // redirect to update page
    navigate(`/vehicle-management/${id}`);
  };

  const handleDelete = async (productId) => {
    const confirmed = window.confirm('Are you sure you want to delete this Production record?');
    if (!confirmed) {
      return;
    }
    await axios
      .delete(`http://localhost:3000/admin-portal/production-management/${productId}`)
      .then(() => {
        setProducts(products.filter((product) => product._id !== productId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchedProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-10 mb-[20px] bg-white rounded-2xl h-[78vh]">
      <TextField
        label="Search Products"
        value={searchTerm}
        onChange={handleSearchTermChange}
        sx={{ mb: 2 }}
      />
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
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchedProducts
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.batchNumber}</TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.quantityProduced}</TableCell>
                <TableCell>{new Date(product.productionDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(product.expirationDate).toLocaleDateString()}</TableCell>
                <TableCell>{product.salesPrice}</TableCell>
                <TableCell>
                  Raw Materials: {product.productionCost.rawMaterials} <br />
                  Labor: {product.productionCost.labor} <br />
                  Packing: {product.productionCost.packing} <br />
                  Other: {product.productionCost.other} <br />
                </TableCell>
                {/* <TableCell>{`RM: ${product.productionCost.rawMaterials}, Labor: ${product.productionCost.labor}, Packing: ${product.productionCost.packing}, Other: ${product.productionCost.other}`}</TableCell> */}
                <TableCell>
                  {/* <Button
                    className="w-full"
                    variant="outlined"
                    onClick={() => handleUpdate(params.row._id)}>
                    Edit
                  </Button> */}
                  <Link to={`/product-management/production-records/${product._id}`} className="">
                    <Button className="w-full" variant="outlined">
                      Info
                    </Button>
                  </Link>

                  <div className="w-1 h-1"></div>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(product._id)}
                    className="w-full">
                    Delete
                  </Button>
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
      {/* <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Batch Number"
              value={batchNumber}
              onChange={(event) => setBatchNumber(event.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Product Name"
              value={productName}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Quantity Produced"
              value={quantityProduced}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Production Date"
              value={productionDate}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Expiration Date"
              value={expirationDate}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Sales Price"
              value={salesPrice}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <InputLabel id="production-cost-label">Production Cost</InputLabel>

            <TextField
              label="Raw Materials"
              value={rawMaterials}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Labor"
              value={labor}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Packing"
              value={packing}
              onChange={(event) => setPacking(event.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Other"
              value={other}
              onChange={(event) => setOther(event.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleEditFormSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default ProductList;
