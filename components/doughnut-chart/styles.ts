import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: fit-content;
  padding: 25px;
  background-color: white;
  border-radius: 5px;
  @media screen and (max-width: 1024px) {
    padding: 12px;
  }
`;

export const Body = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const Doughnuts = styled.div`
  position: relative;
`;

export const Outer = styled.div`
  width: 140px;
  font-size: 16px;
  margin: 0 auto;
  animation: donutfade 1s;
  .donut-ring {
    stroke: #ececec;
  }
  .donut-segment {
    transform-origin: center;
  }
  .donut-segment-2 {
    stroke: #00c0ff;
    animation: donut1 3s;
  }
`;
export const Inner = styled.div`
  width: 100px;
  font-size: 16px;
  margin: 0 auto;
  animation: donutfade 1s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .donut-ring {
    stroke: #ececec;
  }
  .donut-segment {
    transform-origin: center;
  }
  .donut-segment-2 {
    stroke: #ffd800;
    animation: donut2 3s;
  }
`;

export const ColorBox = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 12px;
`;
