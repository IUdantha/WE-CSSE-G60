import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import Main from './UpdateMain';

const ProductUpdatePageLayout = styled.div``;

const ProductUpdatePage = () => {
  return (
    <ProductUpdatePageLayout className="flex flex-col">
      <Header />
      <Main />
    </ProductUpdatePageLayout>
  );
};

export default ProductUpdatePage;
