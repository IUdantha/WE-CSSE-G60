import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonGroup, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

const StockDisplayContainer = styled.div``;

const StockDispaly = () => {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState([]);
  const [filterdata, setFilterdata] = useState();
  const [query, setQuery] = useState('');

  useEffect(() => {
    function getsupplier() {
      axios
        .get('http://localhost:3000/admin-portal/stock-management/getsuppliers', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          console.log(res.data);
          setSupplier(res.data);
          setFilterdata(res.data);
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
    getsupplier();
  }, []);

  //delete supplier

  // const deleteSupplier = async (id) => {
  //   console.warn(id);
  //   let result = await fetch(
  //     `http://localhost:3000/admin-portal/stock-management/deletesupplier/${id}`,
  //     {
  //       method: 'Delete'
  //     }
  //   );

  //   result = await result.json();
  //   if (result) {
  //     alert('Supplier is deleted');
  //     getsupplier();
  //   }
  // };

  function deleteSupplier(id) {
    axios
      .delete('http://localhost:3000/admin-portal/stock-management/deletesupplier/' + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        alert('Deleted successful');

        const newrecords = supplier.filter((sup) => sup._id != id);
        setSupplier(newrecords);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //generate report
  const generatepdf = async () => {
    await axios
      .post(`http://localhost:3000/admin-portal/stock-management/createpdfsup`, supplier, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response);
        axios
          .get('http://localhost:3000/admin-portal/stock-management/fetchpdfsup', {
            responseType: 'blob',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            console.log(res);
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'supplier.pdf');
          });
      });
  };

  //delete new

  // const deleteHandler = async () => {
  //   await axios
  //     .delete(`http://localhost:3000/admin-portal/stock-management/deletesupplier/${id}`)
  //     .then((res) => res.data)
  //     .then(() => history('/'))
  //     .then(() => history('/stock-management'));
  // };
  const handlesearch = (event) => {
    const getSeacrh = event.target.value;
    setQuery(getSeacrh);
    //console.log(getSeacrh);

    if (getSeacrh.length > 0) {
      const getSeacrh = event.target.value;
      const searchdata = supplier.filter((item) => item.supID.toUpperCase().includes(getSeacrh));
      setSupplier(searchdata);
    } else {
      setSupplier(filterdata);
    }
    setQuery(getSeacrh);
  };

  return (
    <StockDisplayContainer className="p-10 mb-[20px] bg-white rounded-xl h-full">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="flex flex-row justify-between items-center">
          <div>
            <input
              type="search"
              name="name"
              value={query}
              className="form-control"
              onChange={(e) => handlesearch(e)}
              placeholder="Search..."
              style={{
                border: 'none',
                borderRadius: '5px',
                padding: '10px',
                fontSize: '16px',
                boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.2)',
                width: '300px',
                height: '40px',
                backgroundColor: '#f2f2f2'
              }}
            />
          </div>
          <div>
            <Button
              style={{ backgroundColor: '#4CAF50', color: '#fff' }}
              className=""
              onClick={generatepdf}>
              Export Report
            </Button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-s font-medium text-gray-700 uppercase">
                        Supplier ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-s font-medium text-gray-700 uppercase">
                        Supplier Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-s font-medium text-gray-700 uppercase">
                        Supplier Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-s font-medium text-gray-700 uppercase">
                        Supplier Contact
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-s font-medium text-gray-700 uppercase">
                        Supplier Company
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-s font-medium text-gray-700 uppercase">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {supplier.length > 0 &&
                      supplier.map((sup) => (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-m font-medium text-gray-800 dark:text-gray-400">
                            {sup.supID}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-m text-gray-800 dark:text-gray-400">
                            {sup.sname}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-m text-gray-800 dark:text-gray-400">
                            {sup.semail}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-m text-gray-800 dark:text-gray-400">
                            {sup.scontact}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-m text-gray-800 dark:text-gray-400">
                            {sup.scompany}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <ButtonGroup>
                              <Button
                                style={{
                                  marginRight: 10,
                                  backgroundColor: '#4CAF50',
                                  color: '#fff',
                                  marginTop: 7
                                }}
                                LinkComponent={Link}
                                to={`supplier/${sup._id}`}
                                sx={{ mt: 'auto' }}>
                                <CreateIcon />
                                       
                              </Button>
                              <Button
                                style={{ backgroundColor: 'Red', color: '#fff' }}
                                onClick={() => deleteSupplier(sup._id)}
                                sx={{ mt: 'auto' }}>
                                <DeleteIcon />
                                       
                              </Button>
                            </ButtonGroup>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StockDisplayContainer>
  );
};

export default StockDispaly;
