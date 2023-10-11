import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import Main from './Main';

const ProductMainPageLayout = styled.div``;

const ProductMainPage = () => {
  return (
    <ProductMainPageLayout className="flex flex-col">
      <Header></Header>
      <Main />
    </ProductMainPageLayout>
  );
};

export default ProductMainPage;
