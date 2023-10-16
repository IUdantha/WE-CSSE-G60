import React from 'react';
import styled from 'styled-components';
import SideBar from '../SideBar';
import InspectorEditLayout from './layouts/InspectorEditLayout';
import TransportSidebar from './sidebar/TransportSidebar';

const MainContainer = styled.div`
  display: flex;
`;
const EditInspector = () => {
  return (
    <MainContainer>
      <TransportSidebar />
      <InspectorEditLayout />
    </MainContainer>
  );
};

export default EditInspector;
