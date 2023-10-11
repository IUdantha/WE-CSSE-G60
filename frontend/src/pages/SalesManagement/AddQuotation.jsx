import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import AddMain from './AddMain';

const AddQuotationContainer = styled.div``;

export default function AddQuotation() {
  return (
    <AddQuotationContainer className="flex flex-col">
      <Header> </Header>
      <AddMain />
    </AddQuotationContainer>
  );
}
// p-10 mb-[20px] bg-white rounded-xl h-full
