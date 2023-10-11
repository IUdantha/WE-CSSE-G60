import SideBar from '../SideBar';
import IncrementTableLayout from './layouts/IncrementTableLayout';
import styled from 'styled-components';
import SalarySidebar from './sidebar/SalarySidebar';

const MainContainer = styled.div`
  display: flex;
`;

function ViewIncrement() {
  return (
    <MainContainer>
      <SalarySidebar />
      <IncrementTableLayout />
    </MainContainer>
  );
}
export default ViewIncrement;
