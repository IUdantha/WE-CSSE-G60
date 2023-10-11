import React, { useEffect, useState } from 'react';
import {
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  Button,
  Snackbar,
  Icon
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Swal from 'sweetalert2';

const URL = 'http://localhost:3000/admin-portal/machine-management/machines';

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
  return await axios
    .get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.data)
    .catch((error) => {
      if (error.response.status === 403) {
        Swal.fire({
          icon: 'warning',
          title: 'Unauthorized',
          text: error.response.data.message
        });
      } else if (error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Not Logged In',
          text: error.response.data.message
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong...',
          text: error.response.data.message
        });
      }
    });
};

const Machine = (props) => {
  const history = useNavigate();
  const {
    _id,
    machineID,
    machineModel,
    sectionNumber,
    brand,
    maintenanceCost,
    lastModifiedDate,
    status
  } = props.machine;

  const [open, setOpen] = useState(false);

  // const deleteHandler = async () => {
  //   await axios
  //     .delete(`http://localhost:3000/admin-portal/machine-management/machines/${_id}`)
  //     .then((res) => res.data)
  //     .then(() => history('/'))
  //     .then(() => history('/machine-management'));
  // };

  const deleteHandler = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this machine?');
    if (!confirmed) {
      return;
    }
    await axios
      .delete(`http://localhost:3000/admin-portal/machine-management/machines/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => res.data)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          history('/machine-management');
        }, 3000);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TBody>
        <TableCell>{machineID}</TableCell>
        <TableCell>{machineModel}</TableCell>
        <TableCell>{sectionNumber}</TableCell>
        <TableCell>{brand}</TableCell>
        <TableCell>{maintenanceCost}</TableCell>
        <TableCell>{new Date(lastModifiedDate).toLocaleDateString()}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell>
          <ButtonGroup>
            <Button
              style={{ marginRight: 10, backgroundColor: '#ffffff', color: '#fff', marginTop: 7 }}
              LinkComponent={Link}
              to={`machines/${_id}`}
              sx={{ mt: 'auto' }}>
              <span style={{ color: '#85C20D' }}>
                <CreateIcon />
              </span>
            </Button>
            <Button
              style={{ backgroundColor: '#ffffff', color: '#fff' }}
              onClick={deleteHandler}
              sx={{ mt: 'auto' }}>
              <span style={{ color: 'red' }}>
                <DeleteIcon />
              </span>
            </Button>
          </ButtonGroup>
        </TableCell>
      </TBody>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Machine deleted successfully!
        </MuiAlert>
      </Snackbar>
    </>
  );
};

const MachineDisplaynew = () => {
  const [machines, setMachines] = useState();
  const [filterdata, setFilterdata] = useState();
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchHandler().then((data) => setMachines(data.machines));
    fetchHandler().then((data) => setFilterdata(data.machines));
  }, []);
  console.log(machines);

  const handlesearch = (event) => {
    const getSeacrh = event.target.value;
    setQuery(getSeacrh);
    //console.log(getSeacrh);

    if (getSeacrh.length > 0) {
      const getSeacrh = event.target.value;
      const searchdata = machines.filter((item) =>
        item.machineID.toLowerCase().includes(getSeacrh)
      );
      setMachines(searchdata);
    } else {
      setMachines(filterdata);
    }
    setQuery(getSeacrh);
  };
  //generate report
  const generatepdf = async () => {
    await axios
      .post(`http://localhost:3000/admin-portal/machine-management/machines/createpdf`, machines, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response);
        axios
          .get('http://localhost:3000/admin-portal/machine-management/machines/fetchpdf', {
            responseType: 'blob',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            console.log(res);
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'Machine-report.pdf');
          });
      });
  };

  return (
    <div>
      <div className=" p-10 mb-[20px] bg-white rounded-2xl h-[89vh]">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="flex flex-row justify-between items-center">
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '2px solid #ccc',
                  borderRadius: '20px'
                }}>
                <input
                  type="search"
                  name="name"
                  value={query}
                  className="form-control"
                  onChange={(e) => handlesearch(e)}
                  placeholder="Search Machine"
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    boxSizing: 'border-box',
                    borderRadius: '20px',
                    outline: 'none',
                    fontSize: '16px',
                    border: 'none'
                  }}
                />
                <SearchIcon style={{ marginRight: '10px', color: '#777' }} />
              </div>
            </div>
            <div className="flex justify-end">
              <div className="flex flex-row gap-5">
                <Button
                  style={{
                    backgroundColor: '#85C20D',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    marginLeft: '30px',
                    padding: '8px 16px',
                    fontSize: '15px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    transition: 'background-color 0.3s ease',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                  className=""
                  startIcon={<AddCircleOutlineIcon></AddCircleOutlineIcon>}>
                  <NavLink end to="/machine-management/add-machine">
                    Add Machine
                  </NavLink>
                </Button>

                <Button
                  style={{
                    backgroundColor: '#000000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '8px 16px',
                    fontSize: '15px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    transition: 'background-color 0.3s ease',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                  className=""
                  startIcon={<TextSnippetIcon></TextSnippetIcon>}
                  onClick={generatepdf}>
                  Export Report
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderBottom: '1px solid #ccc', margin: '20px 0' }}>
          <hr />
        </div>

        <StyledTable>
          <TableHead>
            <THead>
              <TableCell>Machine Register Number</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>brand</TableCell>
              <TableCell>Maintenance Cost</TableCell>
              <TableCell>Last Modified Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </THead>
          </TableHead>

          <TableBody>
            {machines && machines.map((machine, i) => <Machine key={i} machine={machine} />)}
          </TableBody>
        </StyledTable>
      </div>
    </div>
  );
};

export default MachineDisplaynew;
