import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Main from './addMain';

const CropManagementLayout = styled.div``;

const AddManagement = () => {
  return (
    <CropManagementLayout className="flex flex-col">
      <Header />
      <Main />
    </CropManagementLayout>
  );
};

export default AddManagement;
