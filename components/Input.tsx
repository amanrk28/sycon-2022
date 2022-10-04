import { Input as AntInput } from 'antd';
import styled from 'styled-components';

export const Input = styled(AntInput)`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;
