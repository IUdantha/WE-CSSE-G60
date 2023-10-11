import styled from 'styled-components';
import Header from '../../components/Header';
import AddVehicle from '../../components/vehicleManagement/AddVehicle';

const VehicleManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddVehiclePage = () => {
  return (
    <VehicleManagementLayout>
      <Header />
      <AddVehicle />
    </VehicleManagementLayout>
  );
};
export default AddVehiclePage;
