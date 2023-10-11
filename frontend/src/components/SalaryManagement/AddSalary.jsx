import React from 'react';
import styled from 'styled-components';
import SideBar from '../SideBar';
import SalaryAddFormLayout from './layouts/SalaryAddFormLayout';
import SalarySidebar from './sidebar/SalarySidebar';

const MainContainer = styled.div`
  display: flex;
`;
const AddSalary = () => {
  return (
    <MainContainer>
      <SalarySidebar />
      <SalaryAddFormLayout />
    </MainContainer>
  );
};

export default AddSalary;
