import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import UpdateMain from '../../components/StaffManagement/UpdateMain';

const UpdateStaffLayout = styled.div``;
const UpdateStaff = () => {
  return (
    <UpdateStaffLayout className="flex flex-col">
      <Header />
      <UpdateMain />
    </UpdateStaffLayout>
  );
};

export default UpdateStaff;
