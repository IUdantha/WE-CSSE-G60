import React from 'react';
import SideBar from './SideBar';
import TableSection from './TableSection';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
`;
const Main = ({ rows, columns }) => {
  return (
    <MainContainer>
      <SideBar />
      <TableSection rows={rows} columns={columns} />
    </MainContainer>
  );
};

export default Main;
