import React from 'react';
import SideBar from '../../components/SideBar';
import styled from 'styled-components';
import Updatelayout from './UpdateLayout';

const MainContainer = styled.div`
  background-color: #d9d9d9;
`;

const Main = () => {
  return (
    <MainContainer className="flex h-[91vh]">
      <SideBar />
      <Updatelayout />
    </MainContainer>
  );
};

export default Main;
