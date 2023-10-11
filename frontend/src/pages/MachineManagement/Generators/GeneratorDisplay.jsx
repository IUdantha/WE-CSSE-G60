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
  Snackbar
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const URL = 'http://localhost:3000/admin-portal/machine-management/generators';

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px auto 175px 40px;
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
    .then((res) => res.data);
};

const Machine = (props) => {
  const history = useNavigate();
  const { _id, generatorID, sectionNumber, Voltage, fuelNeed, maintainedTimes, status } =
    props.generator;

  const [open, setOpen] = useState(false);

  const deleteHandler = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this generator?');
    if (!confirmed) {
      return;
    }
    await axios
      .delete(`http://localhost:3000/admin-portal/machine-management/generators/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          window.location.reload();
        }, 3000);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TBody>
        <TableCell>{generatorID}</TableCell>
        <TableCell>{sectionNumber}</TableCell>
        <TableCell>{Voltage}</TableCell>
        <TableCell>{fuelNeed}</TableCell>
        <TableCell>{maintainedTimes}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell>
          <ButtonGroup>
            <Button
              style={{ marginRight: 10, backgroundColor: '#ffffff', color: '#fff', marginTop: 7 }}
              LinkComponent={Link}
              to={`generators/${_id}`}
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
          Generator deleted successfully!
        </MuiAlert>
      </Snackbar>
    </>
  );
};

const GeneratorDisplay = () => {
  const [generators, setGenerators] = useState();
  const [filterdata, setFilterdata] = useState();
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchHandler().then((data) => setGenerators(data.generators));
    fetchHandler().then((data) => setFilterdata(data.generators));
  }, []);
  console.log(generators);

  const handlesearch = (event) => {
    const getSeacrh = event.target.value;
    setQuery(getSeacrh);
    //console.log(getSeacrh);

    if (getSeacrh.length > 0) {
      const getSeacrh = event.target.value;
      const searchdata = generators.filter((item) =>
        item.generatorID.toLowerCase().includes(getSeacrh)
      );
      setGenerators(searchdata);
    } else {
      setGenerators(filterdata);
    }
    setQuery(getSeacrh);
  };

  //generate report
  const generatepdf = async () => {
    await axios
      .post(
        `http://localhost:3000/admin-portal/machine-management/generators/createpdf`,
        generators,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then((response) => {
        console.log(response);
        axios
          .get('http://localhost:3000/admin-portal/machine-management/generators/fetchpdf', {
            responseType: 'blob',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            console.log(res);
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'Generator-report.pdf');
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
                  <NavLink end to="/machine-management/add-generator">
                    Add Generator
                  </NavLink>
                </Button>

                <Button
                  style={{
                    backgroundColor: '#000000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '8px 16px',
                    fontSize: '14px',
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
              <TableCell>Generator Register Number</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Voltage(KW)</TableCell>
              <TableCell>Fuel Need(L)</TableCell>
              <TableCell>Maintained Times</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </THead>
          </TableHead>

          <TableBody>
            {generators &&
              generators.map((generator, i) => <Machine key={i} generator={generator} />)}
          </TableBody>
        </StyledTable>
      </div>
    </div>
  );
};

export default GeneratorDisplay;
