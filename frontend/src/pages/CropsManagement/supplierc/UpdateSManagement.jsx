import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import MainS from './AddSUpdateMain';

const SupplierssManagementLayout = styled.div``;

const UpdateSupplierssManagement = () => {
  return (
    <SupplierssManagementLayout className="flex flex-col">
      <Header />
      <MainS />
    </SupplierssManagementLayout>
  );
};

export default UpdateSupplierssManagement;
