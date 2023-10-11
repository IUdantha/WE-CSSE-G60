import TopBar from '../topbar/SalaryTopBar';
import IncrementTable from '../tables/IncrementTable';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

function IncrementTableLayout() {
  return (
    <MainContainer>
      <SecondaryLayout>
        <IncrementTable />
      </SecondaryLayout>
    </MainContainer>
  );
}
export default IncrementTableLayout;
