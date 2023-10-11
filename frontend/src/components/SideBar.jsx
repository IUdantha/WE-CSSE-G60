import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../theme';
import { Button } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SideBarContainer = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 20px;
  padding: 10px;
  margin: 0px 10px 20px 20px;
  box-shadow: 0px 0px 10px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SidebarHeading = styled.h2`
  white-space: nowrap;
  font-size: small;
`;

const SidebarOptions = styled.ul``;

const SidebarOption = styled.li`
  color: ${colors.primary};
  margin: 20px 0;
  font-size: small;
  font-weight: 500;
  cursor: pointer;
`;

const SideBar = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const currentPage = pathSegments[1];
  const sidebarTitle = currentPage.replace('-', ' ');
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  const sidebarOptions = {
    'staff-management': ['Add Staff Member'],
    'product-management': ['Products', 'Production Records'],

    'sales-management': ['Add Quotation', 'Product Details'],

    'stock-management': [
      'All Suppliers',
      'Add Supplier',
      'All Firewood Stocks',
      'Add Firewood Stocks',
      'All Packing materials',
      'Add Packing materials'
    ],

    'machine-management': ['All Machines', 'Add Machine', 'All Generators', 'Add Generator'],
    'generator-management': ['All Generators', 'Add Generator'],
    'crops-management': ['Add Crops'],
    'supplierc-management': ['Add Supplier']

    // add more pages and options here as needed
  };
  return (
    <SideBarContainer>
      <SidebarHeading>
        <Link to={`/${currentPage}`}>
          <div className="flex flex-row items-center justify-center gap-2 px-4 py-4 m-4 text-white bg-primary rounded-xl">
            <ion-icon name="apps"></ion-icon>
            <p>
              <strong>{sidebarTitle.toUpperCase()}</strong>
            </p>
          </div>
        </Link>
      </SidebarHeading>
      <SidebarOptions>
        {sidebarOptions[currentPage] &&
          sidebarOptions[currentPage].map((option, index) => (
            <Link key={index} to={`/${currentPage}/${option.split(' ').join('-').toLowerCase()}`}>
              <SidebarOption>
                <div>
                  <p>{option}</p>
                </div>
              </SidebarOption>
            </Link>
          ))}
      </SidebarOptions>
      <Button
        onClick={handleLogout}
        size="small"
        style={{ position: 'absolute', bottom: 50, left: 40 }}
        startIcon={<Logout />}>
        Log out
      </Button>
    </SideBarContainer>
  );
};

export default SideBar;
