import { Button } from 'antd';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import useRazorpay, { RazorpayOptions } from 'react-razorpay';
import styled from 'styled-components';
import { Routes } from 'components/types';
import { Dropdown } from 'components/dropdown';
import { Form, FormItem } from 'components/Form';
import { Input } from 'components/Input';
import { Title } from 'components/title';
import { setSs, ssKeys, getSs, clearSs } from 'utils/ssUtil';
import { PayloadData, Fields, PaymentMode } from './types';
import {
  dropdownRules,
  rcList,
  inputFields,
  snuDegreeNames,
  ssnBranchNames,
  ssnDegreeNames,
  snuBranchNames,
  mastersBranchNames,
  collegeNames,
  yearList,
  College,
  MastersDegree,
} from './constants';
import {
  generateUsername,
  checkIfUserExists,
  inputValidator,
  sanitizeData,
} from './utils';
import { createRegistration, createRzpOrder, updateRegistration } from './api';

const InputContainer = styled(FormItem)`
  margin: 14px 0;
  width: 100%;
  max-width: 400px;
`;

const DropdownInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  > div {
    width: 48%;
  }
  @media screen and (max-width: 900px) {
    flex-direction: column;
    width: 100%;
    > div {
      width: 100%;
    }
  }
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  margin: 12px 0;
  @media screen and (max-width: 900px) {
    max-width: 400px;
    flex-direction: column;
    width: 100%;
    margin: 20px 0;
    button {
      width: 100%;
    }
  }
`;

const SubmitFormItem = styled(FormItem)`
  width: 48%;
  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const RegistrationForm: FC = () => {
  const router = useRouter();
  const Razorpay = useRazorpay();
  const [payloadData, setPayloadData] = useState<PayloadData>({
    fullName: '',
    email: '',
    registerNumber: '',
    phone: '',
    year: '',
    college: '',
    degree: '',
    branch: '',
    referralCode: '',
  });
  const [paymentMode, setPaymentMode] = useState<PaymentMode | null>(null);

  const displayRazorPay = useCallback(
    async (userData: PayloadData) => {
      const razorpayData = await createRzpOrder();

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || 'rzp_test_tsTFWwMvoaYiG0',
        currency: razorpayData.data.currency,
        amount: razorpayData.data.amount.toString(),
        order_id: razorpayData.data.id,
        name: 'SYCon 2022',
        description: 'Creating Leaders and inspiring change',
        prefill: {
          name: userData.fullName,
          email: userData.email,
          contact: userData.phone,
        },
        handler: async function (res) {
          const username = getSs(ssKeys.firebaseRegUserRef);
          if (username && userData.referralCode) {
            await updateRegistration({
              res,
              referralCode: userData.referralCode,
              username,
            });
            clearSs();
            router.push(Routes.PaymentSuccess);
          }
        },
      };
      const paymentObject = new Razorpay(options);
      paymentObject.on('payment.failed', (res: any) => {
        toast.error(res.error.description);
      });
      paymentObject.open();
    },
    [Razorpay, router]
  );

  const onSubmit = useCallback(
    async (values: PayloadData) => {
      const { data } = sanitizeData(values);
      if (
        Object.values(MastersDegree).includes(data.degree as any) &&
        !['1', '2'].includes(data.year)
      ) {
        throw new Error('Year must 1 or 2 for Masters Degree');
      }
      setPayloadData(data);
      const { fullName, email, registerNumber } = data;
      const username = generateUsername(fullName);
      const { isUser, userData } = await checkIfUserExists(
        registerNumber,
        email
      );
      if (isUser && userData) {
        if (userData.hasPaid) {
          throw new Error('Registration already done!');
        } else {
          displayRazorPay({
            ...userData,
            referralCode: userData.referral_code,
          });
          throw new Error(
            'Registration already done. Redirecting to payment...'
          );
        }
      }
      setSs(ssKeys.firebaseRegUserRef, username);
      await createRegistration({ ...data, username });
      if (paymentMode === PaymentMode.Online) displayRazorPay(data);
      else {
        router.push(Routes.RegistrationSuccess);
      }
    },
    [displayRazorPay, paymentMode, router]
  );

  const [form] = Form.useForm();

  return (
    <Form
      colon={false}
      form={form}
      onFinish={(values: any) => {
        toast.promise(onSubmit(values), {
          loading: 'Loading...',
          success: 'Registration Successful 🎉',
          error: err => err.toString().replace('Error:', ''),
        });
      }}
    >
      <Title level={3}>Student Registration</Title>
      {inputFields.map(field => (
        <InputContainer
          key={field.id}
          name={field.id}
          label={field.label}
          rules={[
            {
              required: true,
              min: 3,
              len: field.max,
            },
            {
              validator: inputValidator(field.id),
            },
          ]}
          hasFeedback
        >
          <Input
            id={field.id}
            addonBefore={field.id === Fields.Phone ? '+91' : ''}
            size="large"
            type={field.type}
          />
        </InputContainer>
      ))}
      <DropdownInput>
        <InputContainer name="year" label={'Year'} rules={dropdownRules}>
          <Dropdown options={yearList} />
        </InputContainer>
        <InputContainer
          name="college"
          label="College"
          rules={dropdownRules}
          shouldUpdate
        >
          <Dropdown
            onSelect={(value: string) =>
              setPayloadData({ ...payloadData, college: value })
            }
            options={collegeNames}
          />
        </InputContainer>
      </DropdownInput>
      <DropdownInput>
        <InputContainer
          name="degree"
          label={'Degree'}
          rules={dropdownRules}
          shouldUpdate
        >
          <Dropdown
            onSelect={(value: string) =>
              setPayloadData({ ...payloadData, degree: value })
            }
            options={
              form.getFieldValue(Fields.College) === College.Ssn
                ? ssnDegreeNames
                : snuDegreeNames
            }
          />
        </InputContainer>
        <InputContainer
          name="branch"
          label={'Branch'}
          rules={dropdownRules}
          shouldUpdate
        >
          <Dropdown
            options={
              form.getFieldValue(Fields.College) === College.Ssn
                ? Object.values(MastersDegree).includes(
                    form.getFieldValue(Fields.Degree) as any
                  )
                  ? mastersBranchNames
                  : ssnBranchNames
                : snuBranchNames
            }
          />
        </InputContainer>
      </DropdownInput>
      <InputContainer
        name="referralCode"
        label={'Referral Code'}
        rules={dropdownRules}
      >
        <Dropdown options={rcList} />
      </InputContainer>
      <SubmitContainer>
        <SubmitFormItem>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            onClick={() => {
              setPaymentMode(PaymentMode.Online);
            }}
          >
            Pay now
          </Button>
        </SubmitFormItem>
        <SubmitFormItem>
          <Button
            htmlType="submit"
            size="large"
            onClick={() => {
              setPaymentMode(PaymentMode.Offline);
            }}
          >
            Pay later
          </Button>
        </SubmitFormItem>
      </SubmitContainer>
    </Form>
  );
};
