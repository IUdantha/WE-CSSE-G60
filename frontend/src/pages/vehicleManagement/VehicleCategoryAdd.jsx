import styled from 'styled-components';
import Header from '../../components/Header';
import AddCategory from '../../components/vehicleManagement/AddCategory';

const VehicleManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;
const VehicleCategoryAdd = () => {
  return (
    <VehicleManagementLayout>
      <Header />
      <AddCategory />
    </VehicleManagementLayout>
  );
};
export default VehicleCategoryAdd;
