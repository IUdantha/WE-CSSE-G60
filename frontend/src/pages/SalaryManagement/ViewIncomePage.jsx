import styled from 'styled-components';
import Header from '../../components/Header';
import ViewIncome from '../../components/SalaryManagement/ViewIncome.jsx';

const TransportManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewIncomePage = () => {
  return (
    <TransportManagementLayout>
      <Header />
      <ViewIncome />
    </TransportManagementLayout>
  );
};
export default ViewIncomePage;
