import styled from 'styled-components';
import Header from '../../components/Header';
import EditCategory from '../../components/vehicleManagement/EditCategory';

const VehicleManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditVehicleCategory = () => {
  return (
    <VehicleManagementLayout>
      <Header />
      <EditCategory />
    </VehicleManagementLayout>
  );
};
export default EditVehicleCategory;
