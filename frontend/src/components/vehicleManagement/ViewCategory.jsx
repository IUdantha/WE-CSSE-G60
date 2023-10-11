import SideBar from '../SideBar';
import CategoryTableLayout from './layouts/CategoryTableLayout';
import styled from 'styled-components';
import VehicleSidebar from './sidebar/VehicleSidebar';

const MainContainer = styled.div`
  display: flex;
`;

function ViewCategory() {
  return (
    <MainContainer>
      <VehicleSidebar />
      <CategoryTableLayout />
    </MainContainer>
  );
}
export default ViewCategory;
