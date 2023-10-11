import styled from 'styled-components';
import Header from '../../components/Header';
import AddSalary from '../../components/salaryManagement/AddSalary.jsx';

const SalaryManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddSalaryPage = () => {
  return (
    <SalaryManagementLayout>
      <Header />
      <AddSalary />
    </SalaryManagementLayout>
  );
};
export default AddSalaryPage;
