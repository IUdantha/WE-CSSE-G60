import styled from 'styled-components';
import Header from '../../components/Header';
import AddInspector from '../../components/TransportManagement/AddInspector.jsx';

const TransportManagementLayout = styled.div`
  display: flex;
  flex-direction: column;
`;
const AddInspectors = () => {
  return (
    <TransportManagementLayout>
      <Header />
      <AddInspector />
    </TransportManagementLayout>
  );
};
export default AddInspectors;
