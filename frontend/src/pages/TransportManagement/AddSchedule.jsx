import styled from 'styled-components';
import Header from '../../components/Header';
import AddSchedule from '../../components/TransportManagement/AddSchedule.jsx';

const TransportManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;
const AddSchedules = () => {
  return (
    <TransportManagementLayout>
      <Header />
      <AddSchedule />
    </TransportManagementLayout>
  );
};
export default AddSchedules;
