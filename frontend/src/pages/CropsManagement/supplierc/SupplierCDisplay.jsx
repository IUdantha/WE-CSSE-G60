import React, { useEffect, useState } from 'react';
import {
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  Button
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const URL = 'http://localhost:3000/admin-portal/supplierc';

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px auto 195px 40px;
`;

const THead = styled(TableRow)`
  background: #ffffff;
  & > th {
    color: gray-800;
    font-size: 15px;
    padding: 10px;
  }
`;

const TBody = styled(TableRow)`
  & > td {
    color: gray;
    font-size: 15px;
    padding: 10px;
  }
`;

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const Supplierc = (props) => {
  const history = useNavigate();
  const { _id, supplierID, supplierName, contactNumber, address, vehicleNumber } = props.suppliers;

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:3000/admin-portal/supplierc/${_id}`)
      .then((res) => res.data)
      .then(() => history('/'))
      .then(() => history('/supplierc-management'));
  };

  return (
    <TBody>
      <TableCell>{supplierID}</TableCell>
      <TableCell>{supplierName}</TableCell>
      <TableCell>{contactNumber}</TableCell>
      <TableCell>{address}</TableCell>
      <TableCell>{vehicleNumber}</TableCell>
      <TableCell>
        <ButtonGroup>
          <Button
            style={{ marginRight: 10, backgroundColor: '#4CAF50', color: '#fff', marginTop: 7 }}
            LinkComponent={Link}
            to={`supplierc/${_id}`}
            sx={{ mt: 'auto' }}>
            <CreateIcon />
          </Button>
          <Button
            style={{ backgroundColor: 'Red', color: '#fff' }}
            onClick={deleteHandler}
            sx={{ mt: 'auto' }}>
            <DeleteIcon />
          </Button>
        </ButtonGroup>
      </TableCell>
    </TBody>
  );
};

const SupplierCDisplaynew = () => {
  const [supplierc, setSupplierc] = useState();
  const [filterdata, setFilterdata] = useState();
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchHandler().then((data) => setSupplierc(data.suppliers));
    fetchHandler().then((data) => setFilterdata(data.suppliers));
  }, []);
  console.log(supplierc);

  const handlesearch = (event) => {
    const getSeacrh = event.target.value;
    setQuery(getSeacrh);
    //console.log(getSeacrh);

    if (getSeacrh.length > 0) {
      const getSeacrh = event.target.value;
      const searchdata = supplierc.filter((item) =>
        item.supplierID.toUpperCase().includes(getSeacrh)
      );
      setSupplierc(searchdata);
    } else {
      setSupplierc(filterdata);
    }
    setQuery(getSeacrh);
  };

  return (
    <div>
      <div className=" p-10 mb-[20px] bg-white rounded-xl h-95">
        <input
          type="search"
          name="name"
          value={query}
          className="form-control"
          onChange={(e) => handlesearch(e)}
          placeholder="Search Suppliers"
          style={{
            width: '20%',
            padding: '12px 20px',
            margin: '10px 0 20px',
            boxSizing: 'border-box',
            borderRadius: '20px',
            border: '2px solid #ccc',
            outline: 'none',
            fontSize: '16px',
            transition: '0.3s',
            '&:focus': {
              border: '2px solid #4CAF50'
            }
          }}
        />

        <StyledTable>
          <TableHead>
            <THead>
              <TableCell>Supplier ID</TableCell>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Vehicle Number</TableCell>
            </THead>
          </TableHead>

          <TableBody>
            {supplierc &&
              supplierc.map((suppliers, i) => <Supplierc key={i} suppliers={suppliers} />)}
          </TableBody>
        </StyledTable>
      </div>
    </div>
  );
};

export default SupplierCDisplaynew;
