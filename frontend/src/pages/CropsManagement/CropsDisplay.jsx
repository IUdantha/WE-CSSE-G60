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
import { Link, NavLink, useNavigate } from 'react-router-dom';

const URL = 'http://localhost:3000/admin-portal/crops';

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

const Crop = (props) => {
  const history = useNavigate();
  const { _id, cropsID, supplierName, contactNumber, weight, date } = props.crop;

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:3000/admin-portal/crops/${_id}`)
      .then((res) => res.data)
      .then(() => history('/'))
      .then(() => history('/crops-management'));
  };

  //generate report
  const generatepdf = async () => {
    await axios
      .post(`http://localhost:3000/admin-portal/crops/createpdf`, crops, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response);
        axios
          .get('http://localhost:3000/admin-portal/crops/fetchpdf', {
            responseType: 'blob',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            console.log(res);
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'Crops-report.pdf');
          });
      });
  };

  return (
    <TBody>
      <TableCell>{cropsID}</TableCell>
      <TableCell>{supplierName}</TableCell>
      <TableCell>{contactNumber}</TableCell>
      <TableCell>{weight}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>
        <ButtonGroup>
          <Button
            style={{ marginRight: 10, backgroundColor: '#4CAF50', color: '#fff', marginTop: 7 }}
            LinkComponent={Link}
            to={`crops/${_id}`}
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

const CropCDisplaynew = () => {
  const [crops, setCrops] = useState();
  const [filterdata, setFilterdata] = useState();
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchHandler().then((data) => setCrops(data.crops));
    fetchHandler().then((data) => setFilterdata(data.crops));
  }, []);
  console.log(crops);

  const handlesearch = (event) => {
    const getSeacrh = event.target.value;
    setQuery(getSeacrh);
    //console.log(getSeacrh);

    if (getSeacrh.length > 0) {
      const getSeacrh = event.target.value;
      const searchdata = crops.filter((item) => item.cropsID.toUpperCase().includes(getSeacrh));
      setCrops(searchdata);
    } else {
      setCrops(filterdata);
    }
    setQuery(getSeacrh);
  };

  // return (
  //   <div>
  //     <div className=" p-10 mb-[20px] bg-white rounded-xl h-95">
  //       <input
  //         type="search"
  //         name="name"
  //         value={query}
  //         className="form-control"
  //         onChange={(e) => handlesearch(e)}
  //         placeholder="Search Crops"
  //         style={{
  //           width: '20%',
  //           padding: '12px 20px',
  //           margin: '10px 0 20px',
  //           boxSizing: 'border-box',
  //           borderRadius: '20px',
  //           border: '2px solid #ccc',
  //           outline: 'none',
  //           fontSize: '16px',
  //           transition: '0.3s',
  //           '&:focus': {
  //             border: '2px solid #4CAF50'
  //           }
  //         }}
  //       />

  //       <StyledTable>
  //         <TableHead>
  //           <THead>
  //             <TableCell>CropsID</TableCell>
  //             <TableCell>Supplier Name</TableCell>
  //             <TableCell>Contact Number</TableCell>
  //             <TableCell>Weight</TableCell>
  //             <TableCell>date</TableCell>

  //           </THead>
  //         </TableHead>

  //         <TableBody>
  //           {crops && crops.map((crop, i) => <Crop key={i} crop={crop} />)}
  //         </TableBody>
  //       </StyledTable>
  //     </div>
  //   </div>
  // );

  return (
    <div>
      <div className="p-10 mb-[20px] bg-white rounded-xl h-95">
        <div style={{ display: 'flex' }}>
          <input
            type="search"
            name="name"
            value={query}
            className="form-control"
            onChange={(e) => handlesearch(e)}
            placeholder="Search Crops"
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

          <NavLink to="http://localhost:5173/supplierc-management">
            <button
              style={{
                marginLeft: '800px',
                padding: '12px 20px',
                borderRadius: '20px',
                border: '2px solid #ccc',
                outline: 'none',
                fontSize: '16px',
                transition: '0.3s',
                backgroundColor: '#f2f2f2',
                cursor: 'pointer',
                textDecoration: 'none'
              }}>
              Supplier Details
            </button>
          </NavLink>
        </div>

        <StyledTable>
          <TableHead>
            <THead>
              <TableCell>CropsID</TableCell>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Date</TableCell>
            </THead>
          </TableHead>

          <TableBody>{crops && crops.map((crop, i) => <Crop key={i} crop={crop} />)}</TableBody>
        </StyledTable>
      </div>
    </div>
  );
};

export default CropCDisplaynew;
