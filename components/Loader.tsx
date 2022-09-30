import styled, { keyframes } from 'styled-components';

const SpinAnimation = keyframes`
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 50;
  padding: 24px;
  transform: translate(-50%, -50%);
  border-radius: 8px;
`;

const Spinner = styled.div`
  border: 8px solid #fff;
  border-radius: 50%;
  border-top: 8px solid #00c0ff;
  width: 80px;
  height: 80px;
  animation: ${SpinAnimation} 1.5s linear infinite;
`;

export const Loader = () => (
  <Container>
    <Spinner />
  </Container>
);
