import React from 'react';
import SideBar from '../../components/SideBar';
import styled from 'styled-components';
import ViewLayout from './ViewLayout';

const MainContainer = styled.div`
  display: flex;
  background-color: #d9d9d9;
`;

const Main = () => {
  return (
    <MainContainer className="h-[91vh]">
      <SideBar />
      <ViewLayout />
    </MainContainer>
  );
};

export default Main;
