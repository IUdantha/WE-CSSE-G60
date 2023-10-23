import styled from 'styled-components';
import Header from '../../components/Header';
import AddRoute from '../../components/TransportManagement/AddRoute.jsx';

const TransportManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;
const AddRoutes = () => {
  return (
    <TransportManagementLayout>
      <Header />
      <AddRoute />
    </TransportManagementLayout>
  );
};
export default AddRoutes;
