import React from 'react';
import SideBar from '../../components/SideBar';
import styled from 'styled-components';
import AddUpdateLayout from './AddCUpdateLayout.jsx';

const MainContainer = styled.div`
  background-color: #d9d9d9;
`;

const Main = () => {
  return (
    <MainContainer className="flex h-[91vh]">
      <SideBar />
      <AddUpdateLayout />
    </MainContainer>
  );
};

export default Main;
