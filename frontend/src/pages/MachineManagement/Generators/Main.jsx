import React from 'react';
import SideBar from '../../../components/SideBar.jsx';
import styled from 'styled-components';
import Layout from './Layout.jsx';

const MainContainer = styled.div`
  display: flex;
  background-color: #d9d9d9;
`;

const Main = () => {
  return (
    <MainContainer className="h-[91vh]">
      <SideBar />
      <Layout />
    </MainContainer>
  );
};

export default Main;
