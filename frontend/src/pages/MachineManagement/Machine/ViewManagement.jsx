import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import Main from './ViewMain.jsx';

const MachineManagementLayout = styled.div``;

const ViewManagement = () => {
  return (
    <MachineManagementLayout className="flex flex-col">
      <Header />
      <Main />
    </MachineManagementLayout>
  );
};

export default ViewManagement;
