import TopBar from '../topbar/TransportTopBar';
import RouteTable from '../tables/RouteTable';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

function RouteTableLayout() {
  return (
    <MainContainer>
      <SecondaryLayout>
        <RouteTable />
      </SecondaryLayout>
    </MainContainer>
  );
}
export default RouteTableLayout;
