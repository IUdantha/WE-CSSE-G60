import styled from 'styled-components';
import Header from '../../components/Header';
import ViewSchedule from '../../components/TransportManagement/ViewSchedule.jsx';

const TransportManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewSchedules = () => {
  return (
    <TransportManagementLayout>
      <Header />
      <ViewSchedule />
    </TransportManagementLayout>
  );
};
export default ViewSchedules;
