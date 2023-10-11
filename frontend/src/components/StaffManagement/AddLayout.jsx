import React from 'react';
import styled from 'styled-components';
import StaffForm from './StaffForm';
const LayoutContainer = styled.div`
  flex: 5;
`;
const AddLayout = () => {
  return (
    <LayoutContainer className="flex flex-col flex-5 gap-5 h-full m-[20px] mt-0 ml-[10px]">
      <StaffForm />
    </LayoutContainer>
  );
};

export default AddLayout;
