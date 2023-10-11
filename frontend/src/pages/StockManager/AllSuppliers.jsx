import { Table, TableBody, TableCell, TableHead, TableRow, styled, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { deleteSupplier, getSuppliers } from './api.js';
import { Link } from 'react-router-dom';

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px auto 0 auto;
`;
const THead = styled(TableRow)`
  background: #000000;
  & > th {
    color: #fff;
    font-size: 20px;
  }
`;

const TBody = styled(TableRow)`
  & > td {
    font-size: 20px;
  }
`;

const AllSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    getAllSuppliers();
  }, []);

  const getAllSuppliers = async () => {
    let response = await getSuppliers();
    setSuppliers(response.data);
  };

  const deleteSupplierDetails = async (id) => {
    await deleteSupplier(id);
    getAllSuppliers();
  };

  return (
    <StyledTable>
      <TableHead>
        <THead>
          <TableCell>Id</TableCell>
          <TableCell>Supplier ID</TableCell>
          <TableCell>Supplier name</TableCell>
          <TableCell>Supplier Email</TableCell>
          <TableCell>Supplier Contact</TableCell>
          <TableCell>sSupplier company</TableCell>
        </THead>
      </TableHead>

      <TableBody>
        {suppliers.map((supplier) => (
          <TBody key={supplier._id}>
            <TableCell>{supplier._id}</TableCell>
            <TableCell>{supplier.supID}</TableCell>
            <TableCell>{supplier.sname}</TableCell>
            <TableCell>{supplier.semail}</TableCell>
            <TableCell>{supplier.scontact}</TableCell>
            <TableCell>{supplier.scompany}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                style={{ marginRight: 10 }}
                component={Link}
                to={`/editsupplier/${supplier._id}`}>
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteSupplierDetails(supplier._id)}>
                Delete
              </Button>
            </TableCell>
          </TBody>
        ))}
      </TableBody>
    </StyledTable>
  );
};

export default AllSuppliers;
