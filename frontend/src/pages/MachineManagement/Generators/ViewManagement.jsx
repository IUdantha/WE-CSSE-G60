import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import Main from './ViewMain.jsx';

const GeneratorManagementLayout = styled.div``;

const ViewManagement = () => {
  return (
    <GeneratorManagementLayout className="flex flex-col">
      <Header />
      <Main />
    </GeneratorManagementLayout>
  );
};

export default ViewManagement;
