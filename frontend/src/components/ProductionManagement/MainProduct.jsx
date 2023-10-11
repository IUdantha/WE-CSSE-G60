import React from 'react';
import styled from 'styled-components';
import TopBarProducts from './TopBarProduct';
// import Section from './Section';
import ProductionRecords from '../../pages/ProductionManagement/ProductionManagement';

const MainContainer = styled.div`
  margin: 0px 20px 20px 10px;
  flex: 4;
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MainProduct = () => {
  return (
    <MainContainer>
      <TopBarProducts />
      <ProductionRecords />
    </MainContainer>
  );
};

export default MainProduct;
