import styled from 'styled-components';
import Header from '../../components/Header';
import ViewCategory from '../../components/vehicleManagement/ViewCategory';

const VehicleManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewVehicleCategory = () => {
  return (
    <VehicleManagementLayout>
      <Header />
      <ViewCategory />
    </VehicleManagementLayout>
  );
};
export default ViewVehicleCategory;
