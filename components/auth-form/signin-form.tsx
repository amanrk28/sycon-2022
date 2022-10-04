import { Button, Form } from 'antd';
import { Input } from 'components/Input';
import { snuDomain, ssnDomain } from 'utils/util';
import { Login, loginFieldsLabel } from './constants';
import { SignIn } from './types';
import { StyledFormItem as FormItem } from './common';

const loginValidator = (_: any, value: any) => {
  if (
    !value.toLowerCase().includes(ssnDomain) &&
    !value.toLowerCase().includes(snuDomain)
  )
    return Promise.reject(new Error('Enter your college email'));
  return Promise.resolve();
};

export const SigninForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: SignIn) => void;
  isLoading: boolean;
}) => {
  return (
    <Form
      colon={false}
      onFinish={(values: any) => {
        onSubmit(values);
      }}
    >
      <FormItem
        name={Login.Email}
        label={loginFieldsLabel[Login.Email]}
        hasFeedback
        rules={[{ required: true }, { validator: loginValidator }]}
      >
        <Input id={Login.Email} type="email" />
      </FormItem>
      <FormItem
        name={Login.Password}
        label={loginFieldsLabel[Login.Password]}
        hasFeedback
        rules={[{ required: true, min: 6 }]}
      >
        <Input.Password id={Login.Password} visibilityToggle />
      </FormItem>
      <FormItem
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          htmlType="submit"
          size="large"
          type="primary"
          loading={isLoading}
        >
          Sign in
        </Button>
      </FormItem>
    </Form>
  );
};
