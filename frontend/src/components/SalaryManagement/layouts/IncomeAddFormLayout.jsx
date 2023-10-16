import TopBar from '../topbar/TransportTopBar';
import AddIncomeForm from '../forms/AddIncomeForm';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

const IncomeAddFormLayout = () => {
  return (
    <MainContainer>
      <SecondaryLayout>
        <AddIncomeForm />
      </SecondaryLayout>
    </MainContainer>
  );
};
export default IncomeAddFormLayout;
