import styled from 'styled-components';
import { TableComponent } from '../../components/ProductionManagement/TableComponent';
import Records from './Records';
import React, { useState } from 'react';

const SectionContainer = styled.div`
  flex: 4;
  background-color: #ffffff;
`;
const Section = () => {
  const [displayComponent1, setDisplayComponent1] = useState(true);
  const handleButtonClick = () => {
    // Toggle between component 1 and component 2 when button is clicked
    setDisplayComponent1(!displayComponent1);
  };

  return (
    <SectionContainer className="p-8 rounded-xl h-screen">
      <div>
        {/* Your button */}
        <button onClick={handleButtonClick}>Change Iside Component</button>

        {/* Conditionally render component 1 or component 2 based on state */}
        {displayComponent1 ? <TableComponent /> : <Records />}
      </div>
    </SectionContainer>
  );
};

export default Section;
