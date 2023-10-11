import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonGroup, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';

const PackingDisplayContainer = styled.div``;

const PackingDispaly = () => {
  const [packing, setPacking] = useState([]);
  const [filterdata, setFilterdata] = useState();
  const [query, setQuery] = useState('');

  useEffect(() => {
    function getpacking() {
      axios
        .get('http://localhost:3000/admin-portal/stock-management/getpackingmaterialstocks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          console.log(res.data);
          setPacking(res.data);
          setFilterdata(res.data);
        })
        .catch(() => {
          alert(err.message);
        });
    }
    getpacking();
  }, []);

  //delete supplier

  // const deletePacking = async (id) => {
  //   console.warn(id);
  //   let result = await fetch(
  //     `http://localhost:3000/admin-portal/stock-management/deletepackingmaterialstock/${id}`,
  //     {
  //       method: 'Delete'
  //     }
  //   );

  //   result = await result.json();
  //   if (result) {
  //     alert('packing stock is deleted');
  //     getpacking();
  //   }
  // };

  const generatepdf = async () => {
    await axios
      .post(`http://localhost:3000/admin-portal/stock-management/createpdfpack`, packing, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response);
        axios
          .get('http://localhost:3000/admin-portal/stock-management/fetchpdfpack', {
            responseType: 'blob',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            console.log(res);
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'packing.pdf');
          });
      });
  };

  function deletePacking(id) {
    axios
      .delete(
        'http://localhost:3000/admin-portal/stock-management/deletepackingmaterialstock/' + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(() => {
        alert('Deleted successful');

        const newrecords = packing.filter((fire) => fire._id != id);
        setPacking(newrecords);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
      const searchdata = packing.filter((item) => item.supID.toUpperCase().includes(getSeacrh));
      setPacking(searchdata);
    } else {
      setPacking(filterdata);
    }
    setQuery(getSeacrh);
  };

  return (
    <PackingDisplayContainer className="p-10 mb-[20px] bg-white rounded-xl h-full">
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
                        Packing Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-s font-medium text-gray-700 uppercase">
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-s font-medium text-gray-700 uppercase">
                        Unit Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-s font-medium text-gray-700 uppercase">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {packing.length > 0 &&
                      packing.map((pack) => (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-m font-medium text-gray-800 dark:text-gray-400">
                            {pack.supID}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-m text-gray-800 dark:text-gray-400">
                            {pack.itemType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-m text-gray-800 dark:text-gray-400">
                            {pack.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-m text-gray-800 dark:text-gray-400">
                            {pack.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <ButtonGroup>
                              {/* <Button
                              style={{
                                marginRight: 10,
                                backgroundColor: '#4CAF50',
                                color: '#fff',
                                marginTop: 7
                              }}
                              LinkComponent={Link}
                              to={`firewood/${fire._id}`}
                              sx={{ mt: 'auto' }}>
                              <CreateIcon />
                                     
                            </Button> */}
                              <Button
                                style={{ backgroundColor: 'Red', color: '#fff' }}
                                onClick={() => deletePacking(pack._id)}
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
    </PackingDisplayContainer>
  );
};

export default PackingDispaly;
