import React from 'react';
import { Button } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Logout } from '@mui/icons-material';

const SideBarContainer = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 20px;
  padding: 10px;
  margin: 0px 10px 20px 20px;
  box-shadow: 0px 0px 10px -3px rgba(0, 0, 0, 0.1);
  height: 90vh;
`;

const SidebarHeading = styled.h2``;
const SidebarOptions = styled.ul``;
const SidebarOption = styled.li``;

const StyledNavLink = styled(NavLink)`
  color: #333;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 10px;
  &.active {
    font-weight: 800;
    /* color: #ffffff; */
    /* background-color: #0077ff; */
  }
`;

const SalarySidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <SideBarContainer>
      <SidebarHeading>
        <div className="flex flex-row items-center justify-center gap-2 px-4 py-4 m-4 text-white bg-primary rounded-xl">
          <ion-icon name="apps"></ion-icon>
          <p>
            <strong>Salary Management</strong>
          </p>
        </div>
      </SidebarHeading>
      <SidebarOptions>
        <SidebarOption>
          <div className="button m-4 px-4 py-2 active:text-white bg-white text-primary flex flex-row gap-2 items-center rounded-xl pl-[40px]">
            <StyledNavLink end to="/salary-management">
              View Salaries
            </StyledNavLink>
          </div>
        </SidebarOption>
        <SidebarOption>
          <div className="button m-4 px-4 py-2 active:text-white bg-white text-primary flex flex-row gap-2 items-center rounded-xl pl-[40px]">
            <StyledNavLink end to="/salary-management/add-salary">
              Add Salaries
            </StyledNavLink>
          </div>
        </SidebarOption>
        <SidebarOption>
          <div className="button m-4 px-4 py-2 active:text-white bg-white text-primary flex flex-row gap-2 items-center rounded-xl pl-[40px]">
            <StyledNavLink end to="/salary-management/increment">
              View Increments
            </StyledNavLink>
          </div>
        </SidebarOption>
        <SidebarOption>
          <div className="button m-4 px-4 py-2 active:text-white bg-white text-primary flex flex-row gap-2 items-center rounded-xl pl-[40px]">
            <StyledNavLink end to="/salary-management/add-increment">
              Add Increments
            </StyledNavLink>
          </div>
        </SidebarOption>
      </SidebarOptions>
      <Button
        onClick={handleLogout}
        size="small"
        style={{ position: 'absolute', bottom: 50, left: 100 }}
        startIcon={<Logout />}>
        Log out
      </Button>
    </SideBarContainer>
  );
};

export default SalarySidebar;
