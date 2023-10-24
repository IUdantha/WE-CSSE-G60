import React from 'react';
import styled from 'styled-components';
import Search from './SearchTransport';
import Button from './Button';

const TopBarContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 0px 10px -3px rgba(0, 0, 0, 0.1);
  padding: 10px;
  height: 65px;
  display: flex;
  justify-content: space-between;
`;
const LeftEnd = styled.div``;
const RightEnd = styled.div`
  display: flex;
  gap: 10px;
`;
const TransportTopBar = () => {
  return (
    <TopBarContainer>
      <LeftEnd>
        <Search />
      </LeftEnd>
      <RightEnd>
        <Button />
      </RightEnd>
    </TopBarContainer>
  );
};

export default TransportTopBar;
