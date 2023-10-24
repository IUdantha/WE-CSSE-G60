import styled from 'styled-components';
import Header from '../../components/Header';
import ViewRoute from '../../components/TransportManagement/ViewRoute.jsx';

const TransportManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewRoutes = () => {
  return (
    <TransportManagementLayout>
      <Header />
      <ViewRoute />
    </TransportManagementLayout>
  );
};
export default ViewRoutes;
