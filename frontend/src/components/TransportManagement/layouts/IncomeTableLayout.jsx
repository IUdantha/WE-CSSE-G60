import TopBar from '../topbar/TransportTopBar';
import IncomeTable from '../tables/IncomeTable';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

function IncomeTableLayout() {
  return (
    <MainContainer>
      <SecondaryLayout>
        <IncomeTable />
      </SecondaryLayout>
    </MainContainer>
  );
}
export default IncomeTableLayout;
