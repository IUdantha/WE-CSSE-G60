import SideBar from '../SideBar';
import styled from 'styled-components';
import IncomeTableLayout from './layouts/IncomeTableLayout';
import TransportSidebar from './sidebar/TransportSidebar';

const MainContainer = styled.div`
  display: flex;
`;

function ViewIncome() {
  return (
    <MainContainer>
      <TransportSidebar />
      <IncomeTableLayout />
    </MainContainer>
  );
}
export default ViewIncome;
