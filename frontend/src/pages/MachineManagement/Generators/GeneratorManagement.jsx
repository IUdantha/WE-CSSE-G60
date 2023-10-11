import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import Main from './Main.jsx';

const GeneratorManagementLayout = styled.div``;

const GeneratorManagement = () => {
  return (
    <GeneratorManagementLayout className="flex flex-col">
      <Header />
      <Main />
    </GeneratorManagementLayout>
  );
};

export default GeneratorManagement;
