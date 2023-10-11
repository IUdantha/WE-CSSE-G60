import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  background-color: #ffffff;
  margin: 0px 10px 20px 20px;
  flex: 1;
`;
// eslint-disable-next-line react/prop-types
const Sidebar = ({ onSelect }) => {
  return (
    <SidebarContainer className="rounded-xl h-screen">
      <div id="wrapper">
        {/* Button type 1 */}
        <a href="#" onClick={() => onSelect('products')} className="nav-btn">
          <div className="button m-4 px-4 py-4 active:bg-primary active:text-white bg-white text-primary flex flex-row gap-2 items-center rounded-xl">
            <ion-icon name="apps"></ion-icon>
            <p>
              <strong>Product Management</strong>
            </p>
          </div>
        </a>

        {/* Button Type 2 */}
        <a href="#" onClick={() => onSelect('addproduction')} className="nav-sub-btn">
          <div className="button m-4 px-4 py-2 active:text-white bg-white text-primary flex flex-row gap-2 items-center rounded-xl pl-[40px]">
            <p>AddProduct</p>
          </div>
        </a>

        <a href="#" onClick={() => onSelect('stock')} className="nav-btn">
          <div className="button m-4 px-4 py-4 bg-white text-primary flex flex-row gap-2 items-center rounded-xl">
            <ion-icon name="apps"></ion-icon>
            <p>
              <strong>Stock Management</strong>
            </p>
          </div>
        </a>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
