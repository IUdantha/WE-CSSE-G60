/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';

const SharedTableContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 0px 10px -3px rgba(0, 0, 0, 0.1);
  padding: 10px;
  height: max-content;
`;
const SharedTable = ({ rows, columns }) => {
  const getRowId = (row) => row.empID;
  return (
    <SharedTableContainer>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          getRowId={getRowId}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
    </SharedTableContainer>
  );
};

export default SharedTable;
