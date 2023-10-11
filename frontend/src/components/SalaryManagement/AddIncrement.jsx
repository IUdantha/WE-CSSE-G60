import React from 'react';
import styled from 'styled-components';
import IncrementFormLayout from './layouts/IncrementFormLayout';
import SalarySidebar from './sidebar/SalarySidebar';

const MainContainer = styled.div`
  display: flex;
`;
const AddIncrement = () => {
  return (
    <MainContainer>
      <SalarySidebar />
      <IncrementFormLayout />
    </MainContainer>
  );
};

export default AddIncrement;
