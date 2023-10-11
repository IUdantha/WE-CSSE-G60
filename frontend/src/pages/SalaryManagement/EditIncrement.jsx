import styled from 'styled-components';
import Header from '../../components/Header';
import EditIncrement from '../../components/salaryManagement/EditIncrement.jsx';

const SalaryManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditIncrementCategory = () => {
  return (
    <SalaryManagementLayout>
      <Header />
      <EditIncrement />
    </SalaryManagementLayout>
  );
};
export default EditIncrementCategory;
