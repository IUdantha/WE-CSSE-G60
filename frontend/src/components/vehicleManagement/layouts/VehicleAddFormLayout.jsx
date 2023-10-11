import TopBar from '../topbar/VehicleTopBar';
import AddVehicleForm from '../forms/AddVehicleForm';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

const VehicleAddFormLayout = () => {
  return (
    <MainContainer>
      <SecondaryLayout>
        <AddVehicleForm />
      </SecondaryLayout>
    </MainContainer>
  );
};
export default VehicleAddFormLayout;
