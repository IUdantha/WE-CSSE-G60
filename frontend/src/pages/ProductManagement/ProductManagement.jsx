import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Main from './Main';

const ProductManagementLayout = styled.div``;

const ProductManagement = () => {
  return (
    <ProductManagementLayout className="flex flex-col">
      <Header></Header>
      <Main />
    </ProductManagementLayout>
  );
};

export default ProductManagement;
