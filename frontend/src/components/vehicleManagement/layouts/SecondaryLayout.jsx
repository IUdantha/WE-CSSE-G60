import styled from 'styled-components';
const Layout = styled.div`
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 0px 10px -3px rgba(0, 0, 0, 0.1);
  padding: 30px;
  height: max-content;
  /* height: 81vh; */
`;

const SecondaryLayout = ({ children }) => {
  return <Layout>{children}</Layout>;
};
export default SecondaryLayout;
