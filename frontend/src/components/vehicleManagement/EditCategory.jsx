import React from 'react';

import styled from 'styled-components';
import SideBar from '../SideBar';
import CategoryEditLayout from './layouts/CategoryEditLayout';
import VehicleSidebar from './sidebar/VehicleSidebar';

const MainContainer = styled.div`
  display: flex;
`;
const EditCategory = () => {
  return (
    <MainContainer>
      <VehicleSidebar />
      <CategoryEditLayout />
    </MainContainer>
  );
};

export default EditCategory;
