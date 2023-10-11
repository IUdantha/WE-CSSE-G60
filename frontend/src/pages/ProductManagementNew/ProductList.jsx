import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
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
const URL = 'http://localhost:3000/admin-portal/product-management';

const ProductList = () => {
  const history = useNavigate();
  const [products, setProducts] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');
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
      .get('http://localhost:3000/admin-portal/product-management')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const handleSearchTermChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:3000/admin-portal/product-management/${productId}`)
      .then(() => {
        setProducts(products.filter((product) => product._id !== productId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const searchedProducts = newproducts.filter((product) =>
  //   product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="p-10 mb-[20px] bg-white rounded-2xl h-[78vh]">
      {/* <TextField
        label="Search Products"
        value={searchTerm}
        onChange={handleSearchTermChange}
        sx={{ mb: 2 }}
      /> */}
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
                <img src={product.image} alt={product.productName} className="w-auto h-20" />
              </TableCell>
              <TableCell>{product.packageType}</TableCell>
              <TableCell>{product.weight}</TableCell>
              <TableCell>{product.barcode}</TableCell>
              <TableCell>{product.serialNumber}</TableCell>
              {/* onClick={() => deleteProduct(product._id)} */}
              <TableCell>
                <Button
                  className="w-full"
                  variant="outlined"
                  LinkComponent={Link}
                  to={`productions/${product._id}`}>
                  Edit
                </Button>
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
