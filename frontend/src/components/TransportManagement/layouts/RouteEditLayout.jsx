import EditRouteForm from '../forms/EditRouteForm';
import TransportTopBar from '../topbar/TransportTopBar';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

const RouteEditLayout = () => {
  return (
    <MainContainer>
      <SecondaryLayout>
        <EditRouteForm />
      </SecondaryLayout>
    </MainContainer>
  );
};
export default RouteEditLayout;
