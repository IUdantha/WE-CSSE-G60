import React from 'react';
import SideBar from '../../../components/SideBar';
import styled from 'styled-components';
import AddSUpdateLayout from './AddSUpdateLayout';

const MainContainer = styled.div`
  background-color: #d9d9d9;
`;

const Main = () => {
  return (
    <MainContainer className="flex h-[91vh]">
      <SideBar />
      <AddSUpdateLayout />
    </MainContainer>
  );
};

export default Main;
