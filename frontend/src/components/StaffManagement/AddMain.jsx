import React from 'react';
import SideBar from '../../components/SideBar';
import styled from 'styled-components';
import AddLayout from './AddLayout';

const MainContainer = styled.div`
  display: flex;
  background-color: #d9d9d9;
  height: 88vh;
`;

const AddMain = () => {
  return (
    <MainContainer>
      <SideBar />
      <AddLayout />
    </MainContainer>
  );
};

export default AddMain;
