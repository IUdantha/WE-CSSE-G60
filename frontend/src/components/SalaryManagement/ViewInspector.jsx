import SideBar from '../SideBar';
import InspectorTableLayout from './layouts/InspectorTableLayout';
import styled from 'styled-components';
import TransportSidebar from './sidebar/TransportSidebar';

const MainContainer = styled.div`
  display: flex;
`;

function ViewInspector() {
  return (
    <MainContainer>
      <TransportSidebar />
      <InspectorTableLayout />
    </MainContainer>
  );
}
export default ViewInspector;
