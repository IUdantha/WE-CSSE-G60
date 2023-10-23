import TopBar from '../topbar/TransportTopBar';
import AddRouteForm from '../forms/AddRouteForm';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

const RouteFormLayout = () => {
  return (
    <MainContainer>
      <SecondaryLayout>
        <AddRouteForm />
      </SecondaryLayout>
    </MainContainer>
  );
};
export default RouteFormLayout;
