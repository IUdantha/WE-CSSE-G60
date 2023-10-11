import styled from 'styled-components';
import Header from '../../components/Header';
import EditVehicle from '../../components/vehicleManagement/EditVehicle';

const VehicleManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditVehiclePage = () => {
  return (
    <VehicleManagementLayout>
      <Header />
      <EditVehicle />
    </VehicleManagementLayout>
  );
};
export default EditVehiclePage;
