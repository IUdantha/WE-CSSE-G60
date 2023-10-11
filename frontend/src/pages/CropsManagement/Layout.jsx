import React from 'react';
import styled from 'styled-components';
import CropsDisplay from './CropsDisplay';

const LayoutContainer = styled.div`
  flex: 5;
`;

const Layout = () => {
  return (
    <LayoutContainer className="flex flex-col flex-5 gap-5  m-[20px] mt-0 ml-[10px]">
      <CropsDisplay />
    </LayoutContainer>
  );
};

export default Layout;
