import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  inputFields,
  branchNames,
  degreeNames,
  collegeNames,
} from 'constants/register';
import PageHead from 'components/PageHead';
import Dropdown from 'components/dropdown';
import { sanitizeData } from 'utils/util';
import { setLs, lsKeys } from 'utils/lsUtil';

const textFieldSx = { width: 400 };

const dropdowns = [
  { id: 'college', label: 'College', list: collegeNames, open: 'openCollege' },
  { id: 'degree', label: 'Degree', list: degreeNames, open: 'openDegree' },
  { id: 'branch', label: 'Branch', list: branchNames, open: 'openBranch' },
];

function generate4DigitNumber() {
  return Math.floor(Math.random() * 10000) + 1;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Register({ prices }) {
  const router = useRouter();
  const [payloadData, setPayloadData] = useState({
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
  const [error, setError] = useState({
    fullName: false,
    email: false,
    registerNumber: false,
    phone: false,
    year: false,
    college: false,
    degree: false,
    branch: false,
    referralCode: false,
  });
  const [anchorElDegree, setAnchorElDegree] = useState(null);
  const [anchorElBranch, setAnchorElBranch] = useState(null);
  const [anchorElCollege, setAnchorElCollege] = useState(null);
  const openVar = {
    openDegree: Boolean(anchorElDegree),
    openBranch: Boolean(anchorElBranch),
    openCollege: Boolean(anchorElCollege),
  };
  const handleClick = (event, id) => {
    if (id === 'degree') setAnchorElDegree(event.currentTarget);
    else if (id === 'college') setAnchorElCollege(event.currentTarget);
    else setAnchorElBranch(event.currentTarget);
  };

  const handleClose = (e, id) => {
    const value = e.target.getAttribute('name');
    if (value) setPayloadData({ ...payloadData, [id]: value });
    if (id === 'degree') setAnchorElDegree(null);
    else if (id === 'college') setAnchorElCollege(null);
    else setAnchorElBranch(null);
  };

  const onChange = (event, key) => {
    const { value } = event.target;
    setPayloadData({ ...payloadData, [key]: value });
  };

  const onSubmit = async (event, paymentMode) => {
    event.preventDefault();
    const { data, errors } = sanitizeData(payloadData);
    setError(errors);
    if (Object.values(errors).includes(true)) {
      toast.error('Fill all fields to continue');
      return;
    } else {
      setPayloadData(data);
      const username =
        data.fullName.substring(0, 15).toLowerCase().replace(/\s/g, '_') +
        generate4DigitNumber();
      setLs(lsKeys.firebaseRegUserRef, username);
      setLs(lsKeys.refCode, data.referralCode);
      await axios({
        baseURL: window.location.origin,
        method: 'POST',
        url: '/api/registration',
        data: { ...data, username, hasPaid: false },
      });
    }
    if (paymentMode === 'online-payment') {
      // Launch stripe checkout session
      const res = await axios({
        baseURL: window.location.origin,
        method: 'POST',
        url: '/api/checkout_session',
        data: {
          priceId: prices[0].id,
          email: data.email || '',
        },
      });
      window.location = res.data.url;
    } else {
      router.push('/registration_success');
    }
  };

  return (
    <>
      <PageHead
        title="SYCon2022 - Creating Leaders and Inspiring Change"
        description="Generated by create next app"
      />

      <div className="register-container">
        <div className="cover-container">
          <Image src="/logo.svg" alt="SYCon" width={127} height={53} />
          <h1>SYCon</h1>
          <p>Creating leaders and inspiring change</p>
        </div>
        <div className="register-form">
          <h3>Student Registration</h3>
          <div className="input-fields">
            {inputFields.map(field => {
              return field.id === 'dropdown-inputs' ? (
                <div className="dropdown-input">
                  {dropdowns.map(dd => (
                    <div className="input-container" key={dd.id}>
                      <Dropdown
                        id={dd.id}
                        value={payloadData[dd.id]}
                        label={dd.label}
                        open={openVar[dd.open]}
                        handleClick={handleClick}
                        handleClose={handleClose}
                        anchor={
                          dd.id === 'degree'
                            ? anchorElDegree
                            : dd.id === 'college'
                            ? anchorElCollege
                            : anchorElBranch
                        }
                        error={error[dd.id]}
                        list={dd.list}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="input-container" key={field.id}>
                  <TextField
                    sx={textFieldSx}
                    value={payloadData[field.id]}
                    type={field.type}
                    label={field.label}
                    onChange={e => onChange(e, field.id)}
                    inputProps={field.props}
                    error={error[field.id]}
                    required
                  />
                </div>
              );
            })}
          </div>
          <div className="payment-container">
            <Button
              variant="contained"
              size="large"
              sx={{ width: 180 }}
              color="info"
              onClick={e => onSubmit(e, 'online-payment')}
            >
              Pay Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{ width: 180 }}
              color="info"
              onClick={e => onSubmit(e, 'offline-payment')}
            >
              Pay Later
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
  });
  const prices = await stripe.prices.list({
    active: true,
  });
  return { props: { prices: prices.data } };
};
