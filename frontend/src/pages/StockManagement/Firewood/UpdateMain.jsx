import React from 'react';
import SideBar from '../../../components/SideBar';
import styled from 'styled-components';
import UpdateLayout from './UpdateLayout';

const MainContainer = styled.div`
  display: flex;
  background-color: #d9d9d9;
`;

const Main = () => {
  return (
    <MainContainer className="h-[91vh]">
      <SideBar />
      <UpdateLayout />
    </MainContainer>
  );
};

export default Main;
