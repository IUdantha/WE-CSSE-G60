import styled from 'styled-components';
import Header from '../../components/Header';
import EditSalary from '../../components/salaryManagement/EditSalary.jsx';

const SalaryManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditSalaryPage = () => {
  return (
    <SalaryManagementLayout>
      <Header />
      <EditSalary />
    </SalaryManagementLayout>
  );
};
export default EditSalaryPage;
