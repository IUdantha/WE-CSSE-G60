import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Main from './Main.jsx';

const CropsManagementLayout = styled.div``;

const CropsManagement = () => {
  return (
    <CropsManagementLayout className="flex flex-col">
      <Header />
      <Main />
    </CropsManagementLayout>
  );
};

export default CropsManagement;
