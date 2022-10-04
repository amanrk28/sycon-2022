import { Form as AntForm } from 'antd';
import styled from 'styled-components';

export const Form = styled(AntForm)`
  padding: 32px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 50vw;
  h3 {
    font-size: 24px;
    font-weight: 500;
  }
  @media screen and (max-width: 900px) {
    margin: 0;
    width: 100%;
  }
`;

export const FormItem = styled(AntForm.Item)`
  .ant-form-item-row {
    flex-direction: column;
    .ant-form-item-label {
      font-size: 14px;
      text-align: left;
    }
  }
`;
