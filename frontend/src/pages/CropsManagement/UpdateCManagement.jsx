import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Main from './AddCUpdateMain';

const CropsManagementLayout = styled.div``;

const UpdateCropsManagement = () => {
  return (
    <CropsManagementLayout className="flex flex-col">
      <Header />
      <Main />
    </CropsManagementLayout>
  );
};

export default UpdateCropsManagement;
