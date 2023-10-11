import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import Main from './Main';

const SuppliercManagementLayout = styled.div``;

const SuppliercManagement = () => {
  return (
    <SuppliercManagementLayout className="flex flex-col">
      <Header />
      <Main />
    </SuppliercManagementLayout>
  );
};

export default SuppliercManagement;
