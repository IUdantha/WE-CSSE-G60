import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import Main from './Main';

const FirewoodManagementLayout = styled.div``;

const FirewoodManagement = () => {
  return (
    <FirewoodManagementLayout className="flex flex-col">
      <Header></Header>
      <Main />
    </FirewoodManagementLayout>
  );
};

export default FirewoodManagement;
