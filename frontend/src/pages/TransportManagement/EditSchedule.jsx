import styled from 'styled-components';
import Header from '../../components/Header';
import EditSchedule from '../../components/TransportManagement/EditSchedule.jsx';

const TransportManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditScheduleCategory = () => {
  return (
    <TransportManagementLayout>
      <Header />
      <EditSchedule />
    </TransportManagementLayout>
  );
};
export default EditScheduleCategory;
