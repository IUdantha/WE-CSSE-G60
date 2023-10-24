import styled from 'styled-components';
import Header from '../../components/Header';
import EditRoute from '../../components/TransportManagement/EditRoute.jsx';

const TransportManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditRouteCategory = () => {
  return (
    <TransportManagementLayout>
      <Header />
      <EditRoute />
    </TransportManagementLayout>
  );
};
export default EditRouteCategory;
