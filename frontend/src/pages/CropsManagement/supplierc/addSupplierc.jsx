// import styled from 'styled-components';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TextField, Button, Container } from '@mui/material';

// const AddSuppliercContainer = styled.div``;

// const AddSupplierc = () => {
//   const [Suppliercs, setSuppliercs] = useState([]);

//   useEffect(() => {
//     // Fetch Suppliercs from backend API
//     axios
//       .get('http://localhost:3000/admin-portal/supplierc')
//       .then((response) => {
//         setSuppliercs(response.data);

//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   // Handle form submission to add a new product
//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     // Add form data to request body
//     const newSupplierc = {
//       supplierID: event.target.supplierID.value,
//       supplierName: event.target.supplierName.value,
//       contactNumber:event.target.contactNumber.value,
//       address:event.target.address.value,
//       vehicleNumber:event.target.vehicleNumber.value,
//     };

//     axios
//       .post('http://localhost:3000/admin-portal/supplierc', newSupplierc)
//       .then(() => {
//         // Refresh products data after successful addition
//         axios
//           .get('http://localhost:3000/admin-portal/supplierc')
//           .then((response) => {
//             setSuppliercs(response.data);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     // Clear form inputs
//     event.target.reset();
//   };

//   return (
//     <AddSuppliercContainer className="p-10 mb-[20px] bg-white rounded-2xl h-[89vh]">
//       <Container>
//         <form
//           onSubmit={handleFormSubmit}
//           className="grid grid-cols-2 gap-4 py-8 w-full mx-0">
//           <TextField label="Suppliercs ID" name="supplierID" />
//           <TextField label="supplier Name" name="supplierName" />
//           <TextField label="Contact Number" name="contactNumber" />
//           <TextField label="Address" name="address" />
//           <TextField label="Vehicle Number" name="vehicleNumber"/>
//           <div className="col-span-2 flex flex-row justify-end ">
//           <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: '#85C20D' }}>
//             ADD Suppliers
//           </Button></div>
//         </form>
//       </Container>
//     </AddSuppliercContainer>
//   );
// };

// export default AddSupplierc;

import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';

const AddSuppliercContainer = styled.div``;

const AddSupplierc = () => {
  const [Suppliercs, setSuppliercs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch Suppliercs from backend API
    axios
      .get('http://localhost:3000/admin-portal/supplierc')
      .then((response) => {
        setSuppliercs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Handle form submission to add a new supplier
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Retrieve form input values
    const supplierID = event.target.supplierID.value.trim();
    const supplierName = event.target.supplierName.value.trim();
    const contactNumber = event.target.contactNumber.value.trim();
    const address = event.target.address.value.trim();
    const vehicleNumber = event.target.vehicleNumber.value.trim();

    // Check if any of the fields are empty
    if (!supplierID || !supplierName || !contactNumber || !address || !vehicleNumber) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Add form data to request body
    const newSupplierc = {
      supplierID,
      supplierName,
      contactNumber,
      address,
      vehicleNumber
    };

    axios
      .post('http://localhost:3000/admin-portal/supplierc', newSupplierc)
      .then(() => {
        // Refresh supplier data after successful addition
        axios
          .get('http://localhost:3000/admin-portal/supplierc')
          .then((response) => {
            setSuppliercs(response.data);
            setErrorMessage(''); // Clear the error message
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    // Clear form inputs
    event.target.reset();
  };

  return (
    <AddSuppliercContainer className="p-10 mb-[20px] bg-white rounded-2xl h-[89vh]">
      <Container>
        <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4 py-8 w-full mx-0">
          <TextField label="Suppliercs ID" name="supplierID" />
          <TextField label="supplier Name" name="supplierName" />
          <TextField label="Contact Number" name="contactNumber" />
          <TextField label="Address" name="address" />
          <TextField label="Vehicle Number" name="vehicleNumber" />
          <div className="col-span-2 flex flex-row justify-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: '#85C20D' }}>
              ADD Suppliers
            </Button>
          </div>
          {errorMessage && <div className="col-span-2 text-red-500 mt-2">{errorMessage}</div>}
        </form>
      </Container>
    </AddSuppliercContainer>
  );
};

export default AddSupplierc;
