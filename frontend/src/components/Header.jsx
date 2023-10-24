import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  background-color: #d9d9d9;
  margin: 10px;
`;
const Header = () => {
  return (
    <HeaderContainer>
      <a className="logo" href="/">
        <img className="h-20 pl-8 py-auto" src="../../../logo.png" alt="logo"></img>
      </a>
    </HeaderContainer>
  );
};

export default Header;
