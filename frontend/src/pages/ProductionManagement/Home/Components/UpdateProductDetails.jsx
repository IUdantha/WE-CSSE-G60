import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
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

function UpdateProductDetails(props) {
  const [product, setProduct] = useState({
    productName: '',
    productCode: '',
    type: '',
    flavour: '',
    qualityControlInformation: '',
    certifications: '',
    inventoryStatus: '',
    image: '',
    packageType: '',
    weight: '',
    barcode: '',
    serialNumber: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin-portal/product-management/${id}`)
      .then((res) => {
        setProduct({
          productName: res.data.productName,
          productCode: res.data.productCode,
          type: res.data.type,
          flavour: res.data.flavour,
          qualityControlInformation: res.data.qualityControlInformation,
          certifications: res.data.certifications,
          inventoryStatus: res.data.inventoryStatus,
          image: res.data.image,
          packageType: res.data.packageType,
          weight: res.data.weight,
          barcode: res.data.barcode,
          serialNumber: res.data.serialNumber
        });
      })
      .catch((err) => {
        console.log('Error from UpdateProduct');
      });
  }, [id]);

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      productName: product.productName,
      productCode: product.productCode,
      type: product.type,
      flavour: product.flavour,
      qualityControlInformation: product.qualityControlInformation,
      certifications: product.certifications,
      inventoryStatus: product.inventoryStatus,
      image: product.image,
      packageType: product.packageType,
      weight: product.weight,
      barcode: product.barcode,
      serialNumber: product.serialNumber
    };

    axios
      .put(`http://localhost:3000/admin-portal/product-management/${id}`, data)
      .then((res) => {
        navigate(`/product-management/single-product/${id}`);
      })
      .catch((err) => {
        console.log('Error in UpdateProduct!');
      });
  };

  return (
    <div className="">
      <div className="bg-white m-16 rounded-2xl h-[90vh]">
        <div className="row">
          <div className="p-8 flex flex-row justify-between items-center">
            <div className="">
              <Link to="/product-management/products" className="btn btn-accent text-white">
                <p>Go to Products</p>
              </Link>
            </div>

            <h1 className="text-2xl pt-4"> Update Product Details</h1>
            <img className="h-16 pl-8 py-auto" src="../../../logo.png" alt="logo"></img>
          </div>
          <hr></hr>
        </div>

        <div className="col-md-8 m-auto">
          <form Validate onSubmit={onSubmit} className="grid grid-cols-2 gap-5 p-8">
            <div className="flex flex-col">
              <label className="text-secondary">Product Name</label>
              <TextField
                name="productName"
                placeholder="Product Name"
                value={product.productName}
                onChange={onChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-secondary">Product Code</label>
              <TextField
                name="productCode"
                placeholder="Product Code"
                value={product.productCode}
                onChange={onChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-secondary">Product Code</label>
              <Select value={product.type} name="type" select>
                <MenuItem value="tea">Tea</MenuItem>
                <MenuItem value="coffee">Coffee</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </div>

            <div className="flex flex-col">
              <label className="text-secondary">Flavour</label>
              <TextField
                name="flavour"
                placeholder="Flavour"
                value={product.flavour}
                onChange={onChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-secondary">Product Description</label>
              <TextField
                name="certifications"
                placeholder="Product Description"
                value={product.certifications}
                onChange={onChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-secondary">Quality Control Information</label>
              <TextField
                name="qualityControlInformation"
                placeholder="Quality Control Information"
                value={product.qualityControlInformation}
                onChange={onChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-secondary">Inventory Status</label>
              <TextField
                name="inventoryStatus"
                placeholder="Inventory Status"
                value={product.inventoryStatus}
                onChange={onChange}
                type="number"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-secondary">Image</label>
              <TextField
                name="image"
                placeholder="Image"
                value={product.image}
                onChange={onChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-secondary">Package Type</label>
              <TextField
                name="packageType"
                placeholder="Package Type"
                value={product.packageType}
                onChange={onChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-secondary">Weight</label>
              <TextField
                name="weight"
                placeholder="Weight"
                value={product.weight}
                onChange={onChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-secondary">Barcode</label>
              <TextField
                name="barcode"
                placeholder="Barcode"
                value={product.barcode}
                onChange={onChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-secondary">Serial Number</label>
              <TextField
                name="serialNumber"
                placeholder="Serial Number"
                value={product.serialNumber}
                onChange={onChange}
                type="number"
              />
            </div>

            <div className="col-span-2 flex flex-row justify-end">
              <button type="submit" className="btn btn-accent text-white">
                Update Product Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProductDetails;
