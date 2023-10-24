import React from 'react';
import styled from 'styled-components';
import SideBar from '../SideBar';
import ScheduleEditLayout from './layouts/ScheduleEditLayout';
import TransportSidebar from './sidebar/TransportSidebar';

const MainContainer = styled.div`
  display: flex;
`;
const EditSchedule = () => {
  return (
    <MainContainer>
      <TransportSidebar />
      <ScheduleEditLayout />
    </MainContainer>
  );
};

export default EditSchedule;
