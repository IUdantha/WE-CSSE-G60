import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Main from './Main';

const StockManagementLayout = styled.div``;

const StockManagement = () => {
  return (
    <StockManagementLayout className="flex flex-col">
      <Header></Header>
      <Main />
    </StockManagementLayout>
  );
};

export default StockManagement;
