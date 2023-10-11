import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Main from './Main';

const ProductsManagementLayout = styled.div``;

const ProductsManagement = () => {
  return (
    <ProductsManagementLayout className="flex flex-col">
      <Header></Header>
      <Main />
    </ProductsManagementLayout>
  );
};

export default ProductsManagement;
