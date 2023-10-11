import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import Main from './Main.jsx';

const MachineManagementLayout = styled.div``;

const MachineManagement = () => {
  return (
    <MachineManagementLayout className="flex flex-col">
      <Header />
      <Main />
    </MachineManagementLayout>
  );
};

export default MachineManagement;
