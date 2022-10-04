import { Button } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import useRazorpay from 'react-razorpay';
import styled from 'styled-components';
import {
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
} from 'constants/register';
import { Dropdown } from 'components/dropdown';
import { Form, FormItem } from 'components/Form';
import { Input } from 'components/Input';
import { Title } from 'components/title';
import { sanitizeData, generate4DigitNumber } from 'utils/util';
import { setSs, ssKeys, getSs, clearSs } from 'utils/ssUtil';
import {
  PayloadData,
  RazorpaySuccesshandlerArgs,
  Fields,
  PaymentMode,
} from './types';
import {
  checkIfUserExists,
  dropdownRules,
  inputValidator,
  rcList,
} from './constants';

interface Props {
  setModal: (value: boolean) => void;
}

const InputContainer = styled(FormItem)`
  margin: 14px 0;
  width: 100%;
  max-width: 400px;
  @media screen and (max-width: 900px) {
    width: 100%;
  }
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
    button {
      margin: 8px 0;
      width: 100%;
    }
  }
`;

export const RegistrationForm: FC<Props> = ({ setModal }) => {
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

  const displayRazorPay = useCallback(
    async (userData: PayloadData) => {
      const razorpayData = await axios({
        baseURL: window.location.origin,
        method: 'POST',
        url: '/api/razorpay',
      });

      const options = {
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
        handler: async function (res: RazorpaySuccesshandlerArgs) {
          const username = getSs(ssKeys.firebaseRegUserRef);
          if (username && userData.referralCode) {
            await axios({
              baseURL: window.location.origin,
              method: 'PUT',
              url: '/api/registration',
              data: {
                username,
                referralCode: userData.referralCode,
                hasPaid: true,
                paymentId: res.razorpay_payment_id,
              },
            });
            clearSs();
            router.push('/success');
          }
        },
      };
      setModal(false);
      const paymentObject = new Razorpay(options);
      paymentObject.on('payment.failed', (res: any) => {
        toast.error(res.error.description);
      });
      paymentObject.open();
    },
    [Razorpay, router, setModal]
  );

  const onSubmit = useCallback(
    async (paymentMode: PaymentMode) => {
      setModal(true);
      const { data } = sanitizeData(payloadData);
      if (
        Object.values(MastersDegree).includes(data.degree as any) &&
        !['1', '2'].includes(data.year)
      ) {
        setModal(false);
        toast.error('Year must 1 or 2 for Masters Degree');
        return;
      }
      setPayloadData(data);
      const username =
        data.fullName.substring(0, 15).toLowerCase().replace(/\s/g, '_') +
        generate4DigitNumber();
      const doesExist = await checkIfUserExists(data.registerNumber);
      if (doesExist) {
        toast.error('Registration already done. Cannot register again');
        setModal(false);
        return;
      }
      setSs(ssKeys.firebaseRegUserRef, username);
      await axios({
        baseURL: window.location.origin,
        method: 'POST',
        url: '/api/registration',
        data: { ...data, username },
      });
      if (paymentMode === PaymentMode.Online) displayRazorPay(data);
      else {
        setModal(false);
        router.push('/registration_success');
      }
    },
    [displayRazorPay, payloadData, router, setModal]
  );

  const [form] = Form.useForm();

  return (
    <Form
      colon={false}
      form={form}
      onFinish={(values: any) => {
        console.log(values);
        setPayloadData({ ...payloadData, ...values });
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
        <InputContainer>
          <Button type="primary" htmlType="submit" size="large">
            Pay now
          </Button>
        </InputContainer>
        <InputContainer>
          <Button htmlType="submit" size="large">
            Pay later
          </Button>
        </InputContainer>
      </SubmitContainer>
    </Form>
  );
};
