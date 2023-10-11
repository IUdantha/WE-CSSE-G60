import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './SidebarProduct';
import MainProducts from './MainProduct';
import AddProduction from '../../pages/ProductionManagement/AddProductionWindow';

const BodyContainer = styled.div`
  display: flex;
`;
const LayoutProduct = () => {
  const [selectedComponent, setSelectedComponent] = useState('');

  const handleSelect = (componentId) => {
    // Update the selected component state when a button is clicked
    setSelectedComponent(componentId);
  };

  return (
    <BodyContainer>
      <Sidebar onSelect={handleSelect} />
      {selectedComponent === 'products' && <MainProducts />}
      {selectedComponent === 'addproduction' && <AddProduction />}
    </BodyContainer>
  );
};

export default LayoutProduct;
