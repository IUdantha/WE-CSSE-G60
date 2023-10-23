import SideBar from '../SideBar';
import RouteTableLayout from './layouts/RouteTableLayout';
import styled from 'styled-components';
import TransportSidebar from './sidebar/TransportSidebar';

const MainContainer = styled.div`
  display: flex;
`;

function ViewRoute() {
  return (
    <MainContainer>
      <TransportSidebar />
      <RouteTableLayout />
    </MainContainer>
  );
}
export default ViewRoute;
