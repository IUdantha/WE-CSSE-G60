import TopBar from '../topbar/SalaryTopBar';
import SalaryTable from '../tables/SalaryTable';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

function SalaryTableLayout() {
  return (
    <MainContainer>
      <SecondaryLayout>
        <SalaryTable />
      </SecondaryLayout>
    </MainContainer>
  );
}
export default SalaryTableLayout;
