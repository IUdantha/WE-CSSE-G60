import React from 'react';
import styled from 'styled-components';
import SideBar from '../SideBar';
import IncrementEditLayout from './layouts/IncrementEditLayout';
import SalarySidebar from './sidebar/SalarySidebar';

const MainContainer = styled.div`
  display: flex;
`;
const EditIncrement = () => {
  return (
    <MainContainer>
      <SalarySidebar />
      <IncrementEditLayout />
    </MainContainer>
  );
};

export default EditIncrement;
