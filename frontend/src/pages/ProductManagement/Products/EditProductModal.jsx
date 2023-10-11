import React, { useState } from 'react';
import { Modal, TextField, Button } from '@mui/material';

const EditProductModal = ({ product, isOpen, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSaveClick = () => {
    onSave(editedProduct);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="modal-container">
        <h2>Edit Product</h2>
        <form>
          <TextField
            label="Product Name"
            name="productName"
            value={editedProduct.productName}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Product Code"
            name="productCode"
            value={editedProduct.productCode}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Type"
            name="type"
            value={editedProduct.type}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Flavour"
            name="flavour"
            value={editedProduct.flavour}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Quality Control Information"
            name="qualityControlInformation"
            value={editedProduct.qualityControlInformation}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Certifications"
            name="certifications"
            value={editedProduct.certifications}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Inventory Status"
            name="inventoryStatus"
            value={editedProduct.inventoryStatus}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Image URL"
            name="image"
            value={editedProduct.image}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Package Type"
            name="packageType"
            value={editedProduct.packageType}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Weight"
            name="weight"
            value={editedProduct.weight}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Barcode"
            name="barcode"
            value={editedProduct.barcode}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Serial Number"
            name="serialNumber"
            value={editedProduct.serialNumber}
            onChange={handleInputChange}
            required
          />
          <Button onClick={handleSaveClick}>Save</Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditProductModal;
