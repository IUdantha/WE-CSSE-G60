import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import Main from './AddMain.jsx';

const MachineManagementLayout = styled.div``;

const AddManagement = () => {
  return (
    <MachineManagementLayout className="flex flex-col">
      <Header />
      <Main />
    </MachineManagementLayout>
  );
};

export default AddManagement;
