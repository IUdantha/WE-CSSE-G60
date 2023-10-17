import styled from 'styled-components';
import Header from '../../components/Header';
import EditIncome from '../../components/TransportManagement/EditIncome.jsx';

const TransportManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditIncomePage = () => {
  return (
    <TransportManagementLayout>
      <Header />
      <EditIncome />
    </TransportManagementLayout>
  );
};
export default EditIncomePage;
