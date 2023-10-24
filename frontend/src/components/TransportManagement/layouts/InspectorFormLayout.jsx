import TopBar from '../topbar/TransportTopBar';
import AddInspectorForm from '../forms/AddInspectorForm';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

const InspectorFormLayout = () => {
  return (
    <MainContainer>
      <SecondaryLayout>
        <AddInspectorForm />
      </SecondaryLayout>
    </MainContainer>
  );
};
export default InspectorFormLayout;
