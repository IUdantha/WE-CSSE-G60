import React from 'react';
import styled from 'styled-components';

const AddProductContainer = styled.div`
  flex: 4;
  background-color: #ffffff;
`;
const AddProductionWindow = () => {
  return <AddProductContainer className="rounded-xl p-4">Add Product</AddProductContainer>;
};

export default AddProductionWindow;
