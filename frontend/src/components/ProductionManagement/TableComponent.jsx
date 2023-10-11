import React from 'react';

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material';

export const TableComponent = () => {
  return (
    <TableContainer component={Paper} width="80%">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">IP Address</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child, &:last-child th': { border: 0 } }}>
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.first_name}</TableCell>
              <TableCell align="center">{row.last_name}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.gender}</TableCell>
              <TableCell align="center">{row.ip_address}</TableCell>
              <TableCell>
                <button className="px-4 py-2 bg-teal-500 text-white m-1">Update</button>
                <button className="px-4 py-2 bg-accent text-white m-1">Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const tableData = [
  {
    id: 1,
    first_name: 'Adeline',
    last_name: 'Bollands',
    email: 'abollands0@shop-pro.jp',
    gender: 'Female',
    ip_address: '10.5.210.239'
  },
  {
    id: 2,
    first_name: 'Alessandra',
    last_name: 'Gwyther',
    email: 'agwyther1@purevolume.com',
    gender: 'Female',
    ip_address: '39.4.232.207'
  },
  {
    id: 3,
    first_name: 'Sophia',
    last_name: 'Lavigne',
    email: 'slavigne2@indiegogo.com',
    gender: 'Female',
    ip_address: '115.51.78.198'
  },
  {
    id: 4,
    first_name: 'Darcie',
    last_name: 'Attew',
    email: 'dattew3@free.fr',
    gender: 'Female',
    ip_address: '34.133.49.225'
  },
  {
    id: 5,
    first_name: 'Kendrick',
    last_name: 'Cumbers',
    email: 'kcumbers4@forbes.com',
    gender: 'Male',
    ip_address: '168.174.186.126'
  },
  {
    id: 6,
    first_name: 'Farlee',
    last_name: 'Norres',
    email: 'fnorres5@earthlink.net',
    gender: 'Bigender',
    ip_address: '255.165.118.82'
  },
  {
    id: 7,
    first_name: 'Shaw',
    last_name: 'Danieli',
    email: 'sdanieli6@etsy.com',
    gender: 'Male',
    ip_address: '203.203.222.115'
  },
  {
    id: 8,
    first_name: 'Burlie',
    last_name: 'Leindecker',
    email: 'bleindecker7@time.com',
    gender: 'Male',
    ip_address: '151.113.76.59'
  },
  {
    id: 9,
    first_name: 'Juliane',
    last_name: 'Lindenblatt',
    email: 'jlindenblatt8@google.it',
    gender: 'Female',
    ip_address: '211.70.125.42'
  },
  {
    id: 10,
    first_name: 'Corny',
    last_name: 'Hugk',
    email: 'chugk9@independent.co.uk',
    gender: 'Female',
    ip_address: '40.211.28.107'
  }
];
