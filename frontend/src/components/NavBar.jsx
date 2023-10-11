import { AppBar, Toolbar, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Header = styled(AppBar)`
  background: #111111;
`;

const Tabs = styled(NavLink)`
  font-size: 20px;
  margin-right: 20px;
  color: inherit;
  text-decoration: none;
`;

const NavBar = () => {
  return (
    <Header position="static">
      <Toolbar>
        <Tabs to="/">Nandana Tea</Tabs>
        <Tabs to="/all">All Suppliers</Tabs>
        <Tabs to="/add">Add Suppliers</Tabs>
      </Toolbar>
    </Header>
  );
};

export default NavBar;
