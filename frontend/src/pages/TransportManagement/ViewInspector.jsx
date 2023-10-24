import styled from 'styled-components';
import Header from '../../components/Header';
import ViewInspector from '../../components/TransportManagement/ViewInspector.jsx';

const TransportManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewInspectors = () => {
  return (
    <TransportManagementLayout>
      <Header />
      <ViewInspector />
    </TransportManagementLayout>
  );
};
export default ViewInspectors;
