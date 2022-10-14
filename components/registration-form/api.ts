import { PayloadData } from './types';
import axios from 'axios';
import { ApiRoutes } from 'components/types';

export const createRzpOrder = () => {
  return axios({
    baseURL: window.location.origin,
    method: 'POST',
    url: ApiRoutes.Razorpay,
  });
};

type RegistrationPayload = PayloadData & { username: string };

export const createRegistration = (data: RegistrationPayload) => {
  return axios({
    baseURL: window.location.origin,
    method: 'POST',
    url: ApiRoutes.Registration,
    data,
  });
};

interface RazorpaySuccesshandlerArgs {
  razorpay_signature: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
}

export const updateRegistration = ({
  res,
  referralCode,
  username,
}: {
  res: RazorpaySuccesshandlerArgs;
  referralCode: string;
  username: string;
}) => {
  return axios({
    baseURL: window.location.origin,
    method: 'PUT',
    url: ApiRoutes.Registration,
    data: {
      username,
      referralCode,
      hasPaid: true,
      paymentId: res.razorpay_payment_id,
    },
  });
};
