import SideBar from '../SideBar';
import styled from 'styled-components';
import SalaryTableLayout from './layouts/SalaryTableLayout';
import SalarySidebar from './sidebar/SalarySidebar';

const MainContainer = styled.div`
  display: flex;
`;

function ViewSalary() {
  return (
    <MainContainer>
      <SalarySidebar />
      <SalaryTableLayout />
    </MainContainer>
  );
}
export default ViewSalary;
