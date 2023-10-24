import styled from 'styled-components';
import Header from '../../components/Header';
import EditInspector from '../../components/TransportManagement/EditInspector.jsx';

const TransportManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditInspectorCategory = () => {
  return (
    <TransportManagementLayout>
      <Header />
      <EditInspector />
    </TransportManagementLayout>
  );
};
export default EditInspectorCategory;
