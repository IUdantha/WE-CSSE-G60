import SideBar from '../SideBar';
import styled from 'styled-components';
import VehicleTableLayout from './layouts/VehicleTableLayout';
import VehicleSidebar from './sidebar/VehicleSidebar';

const MainContainer = styled.div`
  display: flex;
`;

function ViewVehicle() {
  return (
    <MainContainer>
      <VehicleSidebar />
      <VehicleTableLayout />
    </MainContainer>
  );
}
export default ViewVehicle;
