import TopBar from '../topbar/TransportTopBar';
import InspectorTable from '../tables/InspectorTable';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

function InspectorTableLayout() {
  return (
    <MainContainer>
      <SecondaryLayout>
        <InspectorTable />
      </SecondaryLayout>
    </MainContainer>
  );
}
export default InspectorTableLayout;
