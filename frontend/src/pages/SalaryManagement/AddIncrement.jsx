import styled from 'styled-components';
import Header from '../../components/Header';
import AddIncrement from '../../components/salaryManagement/AddIncrement.jsx';

const SalaryManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;
const AddIncrements = () => {
  return (
    <SalaryManagementLayout>
      <Header />
      <AddIncrement />
    </SalaryManagementLayout>
  );
};
export default AddIncrements;
