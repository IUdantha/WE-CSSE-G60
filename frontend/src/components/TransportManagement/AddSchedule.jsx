import React from 'react';
import styled from 'styled-components';
import ScheduleFormLayout from './layouts/ScheduleFormLayout';
import TransportSidebar from './sidebar/TransportSidebar';

const MainContainer = styled.div`
  display: flex;
`;
const AddSchedule = () => {
  return (
    <MainContainer>
      <TransportSidebar />
      <ScheduleFormLayout />
    </MainContainer>
  );
};

export default AddSchedule;
