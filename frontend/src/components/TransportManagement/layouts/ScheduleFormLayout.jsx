import TopBar from '../topbar/TransportTopBar';
import AddScheduleForm from '../forms/AddScheduleForm';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

const ScheduleFormLayout = () => {
  return (
    <MainContainer>
      <SecondaryLayout>
        <AddScheduleForm />
      </SecondaryLayout>
    </MainContainer>
  );
};
export default ScheduleFormLayout;
