import React, { useState } from 'react';
import styled from 'styled-components';
import Updatefirewood from './Updatefirewood';

const LayoutContainer = styled.div`
  flex: 5;
`;

const Layout = () => {
  return (
    <LayoutContainer className="flex flex-col flex-5 gap-5 h-full m-[20px] mt-0 ml-[10px]">
      <Updatefirewood />
    </LayoutContainer>
  );
};

export default Layout;
