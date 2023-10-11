import TopBar from '../topbar/SalaryTopBar';
import EditSalaryForm from '../forms/EditSalaryForm';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

const SalaryEditLayout = () => {
  return (
    <MainContainer>
      <SecondaryLayout>
        <EditSalaryForm />
      </SecondaryLayout>
    </MainContainer>
  );
};
export default SalaryEditLayout;
