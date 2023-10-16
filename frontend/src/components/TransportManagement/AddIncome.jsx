import React from 'react';
import styled from 'styled-components';
import SideBar from '../SideBar';
import IncomeAddFormLayout from './layouts/IncomeAddFormLayout';
import TransportSidebar from './sidebar/TransportSidebar';

const MainContainer = styled.div`
  display: flex;
`;
const AddIncome = () => {
  return (
    <MainContainer>
      <TransportSidebar />
      <IncomeAddFormLayout />
    </MainContainer>
  );
};

export default AddIncome;
