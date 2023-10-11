import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonGroup, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import { TablePagination } from '@material-ui/core';

const SalesDisplayContainer = styled.div``;

const SalesDisplay = () => {
  const navigate = useNavigate();
  const rowsPerPageOptions = [4, 10, 25];
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //search
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedQuotation = sales.filter((sal) =>
    sal.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //fetch Quotations
  useEffect(() => {
    function getSales() {
      axios
        .get('http://localhost:3000/admin-portal/sales-management/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          console.log(res.data);
          setSales(res.data);
        })
        .catch((error) => {
          if (error.response.status === 403) {
            Swal.fire(
              {
                icon: 'warning',
                title: 'Unauthorized',
                text: error.response.data.message
              },
              navigate('/home')
            );
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
    }
    getSales();
  }, []);

  //delete quotation

  function deleteQuotation(id) {
    axios
      .delete('http://localhost:3000/admin-portal/sales-management/deletequo/' + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        // alert('Deleted successful');

        const newrecords = sales.filter((sal) => sal._id != id);
        setSales(newrecords);

        Swal.fire({
          title: 'Deleted!',
          text: 'Item has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: 'Item could not be deleted.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }

  const handleConfirmation = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteQuotation(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  //generate report
  const generatepdf = async () => {
    await axios
      .post(`http://localhost:3000/admin-portal/sales-management/createpdf`, sales, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response);
        axios
          .get('http://localhost:3000/admin-portal/sales-management/fetchpdf', {
            responseType: 'blob',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            console.log(res);
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'sales.pdf');
          });
      });
  };

  const Status = ({ status }) => {
    if (status === 'New') {
      return (
        <td>
          <div className="py-5 px-6">
            <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-3 py-1 rounded dark:bg-red-600 dark:text-gray-100">
              New
            </span>
          </div>
        </td>
      );
    } else if (status === 'Processing') {
      return (
        <td>
          <div className="py-1 px-1">
            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-3 py-1 rounded dark:bg-yellow-600 dark:text-gray-100">
              Processing
            </span>
          </div>
        </td>
      );
    } else
      return (
        <td>
          <div className="py-5 px-6">
            <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-3 py-1 rounded dark:bg-green-600 dark:text-gray-100">
              Done
            </span>
          </div>
        </td>
      );
  };

  return (
    <SalesDisplayContainer className="p-10 mb-[20px] bg-white rounded-xl h-full">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="flex flex-row justify-between items-between mb-3">
              <TextField
                label="Search Quotations"
                value={searchTerm}
                onChange={handleSearchTermChange}
                className=""
              />
              <Button
                style={{ backgroundColor: '#4CAF50', color: '#fff' }}
                className=""
                onClick={generatepdf}>
                Export Report
              </Button>
            </div>
            <div className="overflow-hidden">
              <TableContainer component={Paper}>
                <Table aria-label="sales table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Customer Name</TableCell>
                      <TableCell>Customer Email</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Price(Rs:)</TableCell>
                      <TableCell>Product Type</TableCell>
                      <TableCell>Package Type</TableCell>
                      <TableCell align="right">Weight</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sales.length > 0 &&
                      searchedQuotation
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((sal) => (
                          <TableRow key={sal._id}>
                            <TableCell component="th" scope="row">
                              {sal.name}
                            </TableCell>
                            <TableCell>{sal.email}</TableCell>
                            <TableCell>{new Date(sal.date).toLocaleDateString()}</TableCell>
                            <TableCell>{sal.price}</TableCell>
                            <TableCell>{sal.producttyp}</TableCell>
                            <TableCell>{sal.packagetyp}</TableCell>
                            <TableCell align="right">{sal.weight}</TableCell>
                            <TableCell align="right">
                              <Status status={sal.status} />
                            </TableCell>
                            <TableCell align="right">
                              <ButtonGroup>
                                <Button
                                  style={{
                                    marginRight: 5,
                                    backgroundColor: '#4CAF50',
                                    color: '#fff',
                                    marginTop: 5
                                  }}
                                  component={Link}
                                  to={`sales/${sal._id}`}
                                  variant="contained"
                                  color="primary">
                                  <CreateIcon />
                                </Button>

                                <Button
                                  style={{
                                    backgroundColor: 'Red',
                                    color: '#fff',
                                    marginRight: 5,
                                    marginTop: 5
                                  }}
                                  onClick={() => handleConfirmation(sal._id)}
                                  variant="contained"
                                  color="secondary">
                                  <DeleteIcon />
                                </Button>
                              </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={searchedQuotation.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
    </SalesDisplayContainer>
  );
};

export default SalesDisplay;
