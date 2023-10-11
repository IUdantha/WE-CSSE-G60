import React from 'react';
import styled from 'styled-components';
import SupplierCDisplay from './SupplierCDisplay';

const LayoutContainer = styled.div`
  flex: 5;
`;

const Layout = () => {
  return (
    <LayoutContainer className="flex flex-col flex-5 gap-5  m-[20px] mt-0 ml-[10px]">
      <SupplierCDisplay />
    </LayoutContainer>
  );
};

export default Layout;
