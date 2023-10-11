/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import ProductTable from './ProductTable';
import styled from 'styled-components';

const ProductsContainer = styled.div``;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:3000/admin-portal/product-management');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/admin-portal/product-management',
        newProduct
      );
      setProducts([...products, response.data]);
      setAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/admin-portal/product-management/${updatedProduct._id}`,
        updatedProduct
      );
      const updatedProducts = products.map((product) =>
        product._id === response.data._id ? response.data : product
      );
      setProducts(updatedProducts);
      setSelectedProduct(null);
      setEditModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/admin-portal/product-management/${productId}`);
      const updatedProducts = products.filter((product) => product._id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductsContainer className="p-10 mb-[20px] bg-white rounded-xl h-full">
      <div className="container mx-auto mt-4">
        <h1 className="text-2xl font-bold mb-4">Product Management</h1>
        <div className="flex justify-end mb-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setAddModalOpen(true)}>
            Add Product
          </button>
        </div>
        <ProductTable
          products={products}
          onEdit={(product) => {
            setSelectedProduct(product);
            setEditModalOpen(true);
          }}
          onDelete={handleDeleteProduct}
        />
        <AddProductModal
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSave={handleAddProduct}
        />
        {selectedProduct && (
          <EditProductModal
            product={selectedProduct}
            open={editModalOpen}
            onClose={() => {
              setSelectedProduct(null);
              setEditModalOpen(false);
            }}
            onSave={handleEditProduct}
          />
        )}
      </div>
    </ProductsContainer>
  );
};

export default Products;
