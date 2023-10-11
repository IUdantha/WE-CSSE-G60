import React, { useState, useEffect } from 'react';
import { Modal, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';

const AddProductModal = ({ open, onClose, onSubmit }) => {
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

  useEffect(() => {
    // Fetch products from backend API
    axios
      .get('http://localhost:3000/admin-portal/product-management')
      .then((response) => {
        setProduct(response.data);
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
            setProduct(response.data);
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
    <Modal open={open} onClose={onClose}>
      <div className="bg-white p-16">
        <form
          onSubmit={handleFormSubmit}
          className="flex justify-between flex-col gap-4 py-8 w-full mx-0">
          <TextField label="productName" name="productName" />
          <TextField label="Product Code" name="productCode" />
          <TextField label="type" name="type" />
          <TextField label="flavour" name="flavour" />
          <TextField label="qualityControlInformation" name="qualityControlInformation" />
          <TextField label="certifications" name="certifications" />
          <TextField label="inventoryStatus" name="inventoryStatus" />
          <TextField label="image" name="image" />
          <TextField label="packageType" name="packageType" />
          <TextField label="weight" name="weight" />
          <TextField label="barcode" name="barcode" />
          <TextField label="serialNumber" name="serialNumber" />
          <Button type="submit" variant="contained" color="primary">
            Add Product
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddProductModal;
