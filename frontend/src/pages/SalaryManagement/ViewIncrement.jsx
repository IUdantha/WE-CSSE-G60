import styled from 'styled-components';
import Header from '../../components/Header';
import ViewIncrement from '../../components/salaryManagement/ViewIncrement.jsx';

const SalaryManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewIncrements = () => {
  return (
    <SalaryManagementLayout>
      <Header />
      <ViewIncrement />
    </SalaryManagementLayout>
  );
};
export default ViewIncrements;
