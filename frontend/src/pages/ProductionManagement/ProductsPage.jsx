import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import LayoutProduct from '../../components/ProductionManagement/LayoutProduct';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f7f8fa;
  height: 100vh;
`;
const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <LayoutProduct />
    </LayoutContainer>
  );
};

export default Layout;
