import TopBar from '../topbar/SalaryTopBar';
import AddIncForm from '../forms/AddIncForm';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

const IncrementFormLayout = () => {
  return (
    <MainContainer>
      <SecondaryLayout>
        <AddIncForm />
      </SecondaryLayout>
    </MainContainer>
  );
};
export default IncrementFormLayout;
