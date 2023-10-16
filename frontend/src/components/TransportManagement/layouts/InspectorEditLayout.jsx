import EditInspectorForm from '../forms/EditInspectorForm';
import TransportTopBar from '../topbar/TransportTopBar';
import MainContainer from './MainContainer';
import SecondaryLayout from './SecondaryLayout';

const InspectorEditLayout = () => {
  return (
    <MainContainer>
      <SecondaryLayout>
        <EditInspectorForm />
      </SecondaryLayout>
    </MainContainer>
  );
};
export default InspectorEditLayout;
