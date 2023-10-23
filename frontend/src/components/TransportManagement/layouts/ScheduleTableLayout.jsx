import TopBar from '../topbar/TransportTopBar';
import ScheduleTable from '../tables/ScheduleTable';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

function ScheduleTableLayout() {
  return (
    <MainContainer>
      <SecondaryLayout>
        <ScheduleTable />
      </SecondaryLayout>
    </MainContainer>
  );
}
export default ScheduleTableLayout;
