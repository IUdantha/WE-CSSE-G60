import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import Main from './AddUpdateMain.jsx';

const MachineManagementLayout = styled.div``;

const UpdateMachineManagement = () => {
  return (
    <MachineManagementLayout className="flex flex-col">
      <Header />
      <Main />
    </MachineManagementLayout>
  );
};

export default UpdateMachineManagement;
