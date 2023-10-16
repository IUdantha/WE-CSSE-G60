import styled from 'styled-components';
import Header from '../../components/Header';
import AddIncome from '../../components/SalaryManagement/AddIncome.jsx';

const TransportManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddIncomePage = () => {
  return (
    <TransportManagementLayout>
      <Header />
      <AddIncome />
    </TransportManagementLayout>
  );
};
export default AddIncomePage;
