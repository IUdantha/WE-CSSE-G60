import React from 'react';
import SideBar from '../../components/SideBar';
import styled from 'styled-components';
import Layout from './Layout';

const MainContainer = styled.div`
  display: flex;
  background-color: rgb(217, 217, 217);
  height: 88vh;
`;

const Main = ({ columns, rows, searchTerm, handleSearch, generatePDF }) => {
  return (
    <MainContainer>
      <SideBar />
      <Layout
        columns={columns}
        rows={rows}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        generatePDF={generatePDF}
      />
    </MainContainer>
  );
};

export default Main;
