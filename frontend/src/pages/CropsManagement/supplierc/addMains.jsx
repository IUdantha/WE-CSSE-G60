import React from 'react';
import SideBar from '../../../components/SideBar';
import styled from 'styled-components';
import AddsLayout from './addsLayout.jsx';
// import AddMachine from './AddMachine.jsx';

const MainContainer = styled.div`
  background-color: #d9d9d9;
`;

const Main = () => {
  return (
    <MainContainer className="flex h-[91vh]">
      <SideBar />
      <AddsLayout />
    </MainContainer>
  );
};

export default Main;
