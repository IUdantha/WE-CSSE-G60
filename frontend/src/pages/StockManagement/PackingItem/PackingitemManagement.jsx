import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import Main from './Main';

const PackingManagementLayout = styled.div``;

const PackingManagement = () => {
  return (
    <PackingManagementLayout className="flex flex-col">
      <Header></Header>
      <Main />
    </PackingManagementLayout>
  );
};

export default PackingManagement;
