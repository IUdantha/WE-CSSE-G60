import EditCatForm from '../forms/EditCatForm';
import TopBar from '../topbar/VehicleTopBar';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

const CategoryEditLayout = () => {
  return (
    <MainContainer>
      <SecondaryLayout>
        <EditCatForm />
      </SecondaryLayout>
    </MainContainer>
  );
};
export default CategoryEditLayout;
