import React from 'react';
import TopBar from './TopBar';
import SharedTable from './SharedTable';
import styled from 'styled-components';

const TableSectionContainer = styled.div`
  flex: 5;
  margin: 20px 20px 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TableSection = ({ rows, columns }) => {
  return (
    <TableSectionContainer>
      <TopBar />
      <SharedTable rows={rows} columns={columns} />
    </TableSectionContainer>
  );
};

export default TableSection;
