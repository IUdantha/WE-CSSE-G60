import TopBar from '../topbar/VehicleTopBar';
import EditVehicleForm from '../forms/EditVehicleForm';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

const VehicleEditLayout = () => {
  return (
    <MainContainer>
      <SecondaryLayout>
        <EditVehicleForm />
      </SecondaryLayout>
    </MainContainer>
  );
};
export default VehicleEditLayout;
