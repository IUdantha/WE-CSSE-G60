import React from 'react';

import styled from 'styled-components';
import CategoryFormLayout from './layouts/CategoryFormLayout';
import VehicleSidebar from './sidebar/VehicleSidebar';

const MainContainer = styled.div`
  display: flex;
`;
const AddCategory = () => {
  return (
    <MainContainer>
      <VehicleSidebar />
      <CategoryFormLayout />
    </MainContainer>
  );
};

export default AddCategory;
