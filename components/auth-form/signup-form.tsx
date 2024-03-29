import { Button, Form } from 'antd';
import { Fragment } from 'react';
import { Dropdown } from 'components/dropdown';
import { Input } from 'components/Input';
import {
  mastersBranchNames,
  snuBranchNames,
  ssnBranchNames,
  yearList,
  dropdownRules,
  inputValidator,
} from 'components/registration-form';
import {
  StyledFormItem as FormItem,
  StyledFormItem1 as InputContainer,
} from './common';
import { SignUpField, signupFields } from './constants';
import { Signup } from './types';

export const SignupForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: Signup) => void;
  isLoading: boolean;
}) => {
  return (
    <Form
      colon={false}
      onFinish={(values: any) => {
        onSubmit(values);
      }}
    >
      {signupFields.map(field => (
        <Fragment key={field.id}>
          {field.id === SignUpField.ConfirmPassword ? (
            <FormItem
              name={field.id}
              label={field.label}
              dependencies={[SignUpField.Password]}
              rules={[
                { required: true, min: 3 },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue(SignUpField.Password) === value
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The two passwords do not match!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                visibilityToggle
                id={field.id}
                type={field.type}
              />
            </FormItem>
          ) : (
            <FormItem
              name={field.id}
              label={field.label}
              rules={[
                { required: true, min: 3 },
                { validator: inputValidator(field.id) },
              ]}
            >
              {field.id === SignUpField.Password ? (
                <Input.Password
                  id={field.id}
                  type={field.type}
                  visibilityToggle
                />
              ) : (
                <Input
                  id={field.id}
                  type={field.type}
                  addonBefore={field.id === SignUpField.Phone ? '+91' : ''}
                />
              )}
            </FormItem>
          )}
        </Fragment>
      ))}
      <InputContainer
        name={SignUpField.Year}
        label={'Year'}
        rules={dropdownRules}
      >
        <Dropdown options={yearList} />
      </InputContainer>
      <InputContainer
        name={SignUpField.Branch}
        label={'Branch'}
        rules={dropdownRules}
        shouldUpdate
      >
        <Dropdown
          options={[
            ...ssnBranchNames,
            ...snuBranchNames,
            ...mastersBranchNames,
          ]}
        />
      </InputContainer>
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
          Sign up
        </Button>
      </FormItem>
    </Form>
  );
};
