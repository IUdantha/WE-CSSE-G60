import React from 'react';
import styled from 'styled-components';
import SalaryEditLayout from './layouts/SalaryEditLayout';
import SalarySidebar from './sidebar/SalarySidebar';

const MainContainer = styled.div`
  display: flex;
`;
const EditSalary = () => {
  return (
    <MainContainer>
      <SalarySidebar />
      <SalaryEditLayout />
    </MainContainer>
  );
};

export default EditSalary;
