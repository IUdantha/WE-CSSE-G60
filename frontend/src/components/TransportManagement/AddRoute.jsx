import React from 'react';
import styled from 'styled-components';
import RouteFormLayout from './layouts/RouteFormLayout';
import TransportSidebar from './sidebar/TransportSidebar';

const MainContainer = styled.div`
  display: flex;
`;
const AddRoute = () => {
  return (
    <MainContainer>
      <TransportSidebar />
      <RouteFormLayout />
    </MainContainer>
  );
};

export default AddRoute;
