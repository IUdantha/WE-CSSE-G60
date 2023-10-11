import TopBar from '../topbar/SalaryTopBar';
import AddSalaryForm from '../forms/AddSalaryForm';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

const SalaryAddFormLayout = () => {
  return (
    <MainContainer>
      <SecondaryLayout>
        <AddSalaryForm />
      </SecondaryLayout>
    </MainContainer>
  );
};
export default SalaryAddFormLayout;
