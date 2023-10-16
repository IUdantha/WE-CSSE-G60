import styled from 'styled-components';
const Container = styled.div`
  flex: 5;
  margin: 20px 20px 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function MainContainer({ children }) {
  return <Container>{children}</Container>;
}
export default MainContainer;
