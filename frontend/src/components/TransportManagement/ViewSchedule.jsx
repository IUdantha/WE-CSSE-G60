import SideBar from '../SideBar';
import ScheduleTableLayout from './layouts/ScheduleTableLayout';
import styled from 'styled-components';
import TransportSidebar from './sidebar/TransportSidebar';

const MainContainer = styled.div`
  display: flex;
`;

function ViewSchedule() {
  return (
    <MainContainer>
      <TransportSidebar />
      <ScheduleTableLayout />
    </MainContainer>
  );
}
export default ViewSchedule;
