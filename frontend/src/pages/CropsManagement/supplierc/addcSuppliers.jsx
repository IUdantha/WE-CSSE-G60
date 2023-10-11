import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import AddMains from './addMains';

const SuppliersManagementLayout = styled.div``;

const AddManagements = () => {
  return (
    <SuppliersManagementLayout className="flex flex-col">
      <Header />
      <AddMains />
    </SuppliersManagementLayout>
  );
};

export default AddManagements;
