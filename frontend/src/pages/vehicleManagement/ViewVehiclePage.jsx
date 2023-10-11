import styled from 'styled-components';
import Header from '../../components/Header';
import ViewVehicle from '../../components/vehicleManagement/ViewVehicle';

const VehicleManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewVehiclePage = () => {
  return (
    <VehicleManagementLayout>
      <Header />
      <ViewVehicle />
    </VehicleManagementLayout>
  );
};
export default ViewVehiclePage;
