import TopBar from '../topbar/VehicleTopBar';
import CategoryTable from '../tables/CategoryTable';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

function CategoryTableLayout() {
  return (
    <MainContainer>
      <SecondaryLayout>
        <CategoryTable />
      </SecondaryLayout>
    </MainContainer>
  );
}
export default CategoryTableLayout;
