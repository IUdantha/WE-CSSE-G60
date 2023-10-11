import React from 'react';
import SideBar from '../../components/SideBar';
import styled from 'styled-components';
import UpdateLayout from './UpdateLayout';

const MainContainer = styled.div`
  display: flex;
  background-color: #d9d9d9;
  height: 88vh;
`;

const UpdateMain = () => {
  return (
    <MainContainer>
      <SideBar />
      <UpdateLayout />
    </MainContainer>
  );
};

export default UpdateMain;
