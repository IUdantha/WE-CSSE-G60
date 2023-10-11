import React from 'react';
import styled from 'styled-components';
import ProductUpdate from './ProductUpdate';

const UpdateLayoutContainer = styled.div`
  flex: 5;
`;

const UpdateLayout = () => {
  return (
    <UpdateLayoutContainer className="flex-5 gap-5 h-full m-[20px] mt-0 ml-[10px]">
      <ProductUpdate />
    </UpdateLayoutContainer>
  );
};

export default UpdateLayout;
