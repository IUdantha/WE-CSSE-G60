import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import { Search, Summarize } from '@mui/icons-material';
import { colors } from '../../theme';

const TopBarContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 0px 10px -3px rgba(0, 0, 0, 0.1);
  padding: 10px 40px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LeftEnd = styled.div``;
const SearchContainer = styled.div``;
const Input = styled.input`
  border: 2px solid #e3e3e3;
  height: 30px;
  padding: 20px;
  border-radius: 10px;
  min-width: 300px;
  outline: none;
  :focus {
    border: 2px solid ${colors.secondary};
  }
`;
const RightEnd = styled.div`
  display: flex;
  gap: 10px;
`;
const TopBar = ({ handleSearch, searchTerm, generatePDF }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/staff-management/add-staff-member');
  };

  return (
    <TopBarContainer>
      <LeftEnd>
        <SearchContainer>
          <Input type="text" placeholder="Search ID" onChange={handleSearch} value={searchTerm} />
          <Search style={{ color: '#cecccc', marginLeft: '-40px' }} />
        </SearchContainer>
      </LeftEnd>
      <RightEnd>
        <Button
          color="secondary"
          onClick={handleClick}
          style={{
            textTransform: 'none',
            maxHeight: '40px',
            borderRadius: '10px'
          }}
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}>
          Add Staff Member
        </Button>
        <Button
          onClick={generatePDF}
          style={{
            // backgroundColor: '#1A2332',
            textTransform: 'none',
            maxHeight: '40px',
            borderRadius: '10px'
          }}
          variant="contained"
          startIcon={<Summarize />}>
          Generate Report
        </Button>
      </RightEnd>
    </TopBarContainer>
  );
};

export default TopBar;
