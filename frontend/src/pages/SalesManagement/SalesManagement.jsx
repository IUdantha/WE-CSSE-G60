import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Main from './Main';

const SalesManagementLayout = styled.div``;

const SalesManagement = () => {
  return (
    <SalesManagementLayout className="flex flex-col">
      <Header></Header>
      <Main />
    </SalesManagementLayout>
  );
};

export default SalesManagement;
