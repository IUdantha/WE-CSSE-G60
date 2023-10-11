import TopBar from '../topbar/VehicleTopBar';
import VehicleTable from '../tables/VehicleTable';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

function VehicleTableLayout() {
  return (
    <MainContainer>
      <SecondaryLayout>
        <VehicleTable />
      </SecondaryLayout>
    </MainContainer>
  );
}
export default VehicleTableLayout;
