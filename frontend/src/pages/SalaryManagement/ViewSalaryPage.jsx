import styled from 'styled-components';
import Header from '../../components/Header';
import ViewSalary from '../../components/salaryManagement/ViewSalary.jsx';

const SalaryManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewSalaryPage = () => {
  return (
    <SalaryManagementLayout>
      <Header />
      <ViewSalary />
    </SalaryManagementLayout>
  );
};
export default ViewSalaryPage;
