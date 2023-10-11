import React from 'react';

import styled from 'styled-components';
import VehicleEditLayout from './layouts/VehicleEditLayout';
import VehicleSidebar from './sidebar/VehicleSidebar';

const MainContainer = styled.div`
  display: flex;
`;
const EditVehicle = () => {
  return (
    <MainContainer>
      <VehicleSidebar />
      <VehicleEditLayout />
    </MainContainer>
  );
};

export default EditVehicle;
