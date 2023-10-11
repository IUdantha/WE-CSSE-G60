import TopBar from '../topbar/VehicleTopBar';
import AddCatForm from '../forms/AddCatForm';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

const CategoryForm = () => {
  return (
    <MainContainer>
      <SecondaryLayout>
        <AddCatForm />
      </SecondaryLayout>
    </MainContainer>
  );
};
export default CategoryForm;
