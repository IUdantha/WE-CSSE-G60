import React from 'react';
import styled from 'styled-components';
import IncomeEditLayout from './layouts/IncomeEditLayout';
import TransportSidebar from './sidebar/TransportSidebar';

const MainContainer = styled.div`
  display: flex;
`;
const EditIncome = () => {
  return (
    <MainContainer>
      <TransportSidebar />
      <IncomeEditLayout />
    </MainContainer>
  );
};

export default EditIncome;
