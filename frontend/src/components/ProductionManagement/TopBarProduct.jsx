import React from 'react';
import styled from 'styled-components';

const TopBarContainer = styled.div`
  flex: 1;
  background-color: #ffffff;
`;
const TopBarProduct = () => {
  return (
    <TopBarContainer className="rounded-xl py-4 flex flex-row justify-between items-center pr-4">
      <div>
        <div className="search-bar flex flex-row gap-4 items-center mx-8">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-md w-full max-w-xs"
          />
          <a href="">
            <ion-icon name="search"></ion-icon>
          </a>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center">
        <a href="#" className="common-btn">
          <div className="button m-2 mx-4 px-4 py-2 bg-accent text-white flex flex-row gap-2 items-center rounded-xl">
            <ion-icon name="apps"></ion-icon>
            <p>
              <strong>Add Product</strong>
            </p>
          </div>
        </a>

        <a href="#" className="common-btn">
          <div className="button m-2 mx-4 px-4 py-2 bg-accent text-white flex flex-row gap-2 items-center rounded-xl">
            <ion-icon name="apps"></ion-icon>
            <p>
              <strong>Genarate Reprts</strong>
            </p>
          </div>
        </a>
      </div>
    </TopBarContainer>
  );
};

export default TopBarProduct;
