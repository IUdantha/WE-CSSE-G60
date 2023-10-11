import React from 'react';
import styled from 'styled-components';
import SideBar from '../SideBar';
import VehicleAddFormLayout from './layouts/VehicleAddFormLayout';
import VehicleSidebar from './sidebar/VehicleSidebar';

const MainContainer = styled.div`
  display: flex;
`;
const AddVehicle = () => {
  return (
    <MainContainer>
      <VehicleSidebar />
      <VehicleAddFormLayout />
    </MainContainer>
  );
};

export default AddVehicle;
