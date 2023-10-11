import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
// import AddMain from './AddMain';
import DisplayProduct from '../SalesManagement/productdetails/DisplayProduct';

const AddQuotationContainer = styled.div``;

export default function AddQuotation() {
  return (
    <AddQuotationContainer className="flex flex-col">
      <Header> </Header>
      <DisplayProduct />
    </AddQuotationContainer>
  );
}
