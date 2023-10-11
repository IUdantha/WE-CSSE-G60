import React, { useState } from 'react';
import TopBar from '../../components/TopBar';
import styled from 'styled-components';
import AddProduction from './AddProduction';
import ProductList from './ProductList';
import Products from './Products/Products';
const LayoutContainer = styled.div`
  flex: 5;
`;
const Layout = () => {
  const [displayComponent1, setDisplayComponent1] = useState(true);
  const handleButtonClick = () => {
    // Toggle between component 1 and component 2 when button is clicked
    setDisplayComponent1(!displayComponent1);
  };

  return (
    <LayoutContainer className="flex flex-col flex-5 gap-5 h-full m-[20px] mt-0 ml-[10px]">
      {/* <TopBar /> */}
      <div className="">
        {/* Your button */}
        <div className="p-5 mb-5  bg-white rounded-2xl flex flex-col items-end w-[1600px]">
          <button className="btn btn-primary" onClick={handleButtonClick}>
            {displayComponent1 ? <p>Add Production Record</p> : <p>View Records</p>}
          </button>
        </div>
        {/* Conditionally render component 1 or component 2 based on state */}
        {displayComponent1 ? <ProductList /> : <AddProduction />}
        {/* <Products /> */}
      </div>
    </LayoutContainer>
  );
};

export default Layout;
