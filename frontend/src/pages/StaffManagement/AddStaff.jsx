import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import AddMain from '../../components/StaffManagement/AddMain';

const AddStaffLayout = styled.div``;
const AddStaff = () => {
  return (
    <AddStaffLayout className="flex flex-col">
      <Header />
      <AddMain />
    </AddStaffLayout>
  );
};

export default AddStaff;
