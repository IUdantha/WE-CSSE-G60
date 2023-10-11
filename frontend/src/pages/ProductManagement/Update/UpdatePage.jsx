import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import Main from './UpdateMain';

const MachineManagementLayout = styled.div``;

const UpdatePage = () => {
  return (
    <MachineManagementLayout className="flex flex-col">
      <Header />
      <Main />
    </MachineManagementLayout>
  );
};

export default UpdatePage;
