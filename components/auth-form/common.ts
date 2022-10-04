import styled from 'styled-components';
import { FormItem } from 'components/Form';

export const StyledFormItem = styled(FormItem)`
  width: 100%;
  min-width: 300px;
  max-width: 400px;
`;

export const StyledFormItem1 = styled(FormItem)`
  margin: 14px 0;
  width: 100%;
  max-width: 400px;
  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;
