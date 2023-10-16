import React from 'react';
import styled from 'styled-components';
import InspectorFormLayout from './layouts/InspectorFormLayout';
import TransportSidebar from './sidebar/TransportSidebar';

const MainContainer = styled.div`
  display: flex;
`;
const AddInspector = () => {
  return (
    <MainContainer>
      <TransportSidebar />
      <InspectorFormLayout />
    </MainContainer>
  );
};

export default AddInspector;
