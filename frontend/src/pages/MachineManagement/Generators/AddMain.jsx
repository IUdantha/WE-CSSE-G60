import React from 'react';
import SideBar from '../../../components/SideBar.jsx';
import styled from 'styled-components';
import AddGenerator from './AddGenerator.jsx';

const MainContainer = styled.div`
  background-color: #d9d9d9;
`;

const Main = () => {
  return (
    <MainContainer className="flex h-[91vh]">
      <SideBar />
      <AddGenerator />
    </MainContainer>
  );
};

export default Main;
