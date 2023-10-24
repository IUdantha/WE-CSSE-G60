import React from 'react';
import styled from 'styled-components';
import SideBar from '../SideBar';
import RouteEditLayout from './layouts/RouteEditLayout';
import TransportSidebar from './sidebar/TransportSidebar';

const MainContainer = styled.div`
  display: flex;
`;
const EditRoute = () => {
  return (
    <MainContainer>
      <TransportSidebar />
      <RouteEditLayout />
    </MainContainer>
  );
};

export default EditRoute;
