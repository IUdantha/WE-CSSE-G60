import EditScheduleForm from '../forms/EditScheduleForm';
import TransportTopBar from '../topbar/TransportTopBar';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

const ScheduleEditLayout = () => {
  return (
    <MainContainer>
      <SecondaryLayout>
        <EditScheduleForm />
      </SecondaryLayout>
    </MainContainer>
  );
};
export default ScheduleEditLayout;
