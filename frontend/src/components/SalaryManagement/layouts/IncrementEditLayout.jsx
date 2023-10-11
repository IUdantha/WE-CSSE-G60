import EditIncForm from '../forms/EditIncForm';
import TopBar from '../topbar/SalaryTopBar';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

const IncrementEditLayout = () => {
  return (
    <MainContainer>
      <SecondaryLayout>
        <EditIncForm />
      </SecondaryLayout>
    </MainContainer>
  );
};
export default IncrementEditLayout;
