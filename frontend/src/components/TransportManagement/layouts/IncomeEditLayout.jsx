import TopBar from '../topbar/TransportTopBar';
import EditIncomeForm from '../forms/EditIncomeForm';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

const IncomeEditLayout = () => {
  return (
    <MainContainer>
      <SecondaryLayout>
        <EditIncomeForm />
      </SecondaryLayout>
    </MainContainer>
  );
};
export default IncomeEditLayout;
