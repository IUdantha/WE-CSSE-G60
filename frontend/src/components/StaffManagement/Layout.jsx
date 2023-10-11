import React from 'react';
import styled from 'styled-components';
import StaffTable from './StaffTable';
import TopBar from './TopBar';

const LayoutContainer = styled.div`
  flex: 5;
`;
const Layout = ({ columns, rows, handleSearch, searchTerm, generatePDF }) => {
  return (
    <LayoutContainer className="flex flex-col flex-5 gap-5 h-full m-[20px] mt-0 ml-[10px]">
      <TopBar handleSearch={handleSearch} searchTerm={searchTerm} generatePDF={generatePDF} />
      <StaffTable columns={columns} rows={rows} />
    </LayoutContainer>
  );
};

export default Layout;
