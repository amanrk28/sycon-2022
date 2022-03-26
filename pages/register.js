import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PageHead from 'components/PageHead';
import Dropdown from 'components/dropdown';
import { inputFields, dropdowns, checkoutButtons } from 'constants/register';
import { sanitizeData, generate4DigitNumber, loadScript } from 'utils/util';
import { setSs, ssKeys, getSs, clearSs } from 'utils/ssUtil';

const textFieldSx = { width: 400 };

export default function Register() {
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
  const [anchorEl, setAnchorEl] = useState({
    degree: null,
    branch: null,
    college: null,
  });
  const openVar = {
    openDegree: Boolean(anchorEl.degree),
    openBranch: Boolean(anchorEl.branch),
    openCollege: Boolean(anchorEl.college),
  };
  const handleClick = (event, id) => {
    setAnchorEl({ ...anchorEl, [id]: event.currentTarget });
  };

  const handleClose = (e, id) => {
    const value = e.target.getAttribute('name');
    if (value) setPayloadData({ ...payloadData, [id]: value });
    setAnchorEl({ ...anchorEl, [id]: null });
  };

  const onChange = (event, key) => {
    const { value } = event.target;
    setPayloadData({ ...payloadData, [key]: value });
  };

  async function displayRazorPay(userData) {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const razorpayData = await axios({
      baseURL: window.location.origin,
      method: 'POST',
      url: '/api/razorpay',
    });

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
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
          await axios({
            baseUrl: window.location.origin,
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
    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', res => {
      toast.error(res.error.description);
    });
    paymentObject.open();
  }

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
      setSs(ssKeys.firebaseRegUserRef, username);
      await axios({
        baseURL: window.location.origin,
        method: 'POST',
        url: '/api/registration',
        data: { ...data, username, hasPaid: false },
      });
    }
    if (paymentMode === 'online-payment') displayRazorPay(data);
    else router.push('/registration_success');
  };

  return (
    <>
      <PageHead
        title="SYCon2022 - Creating Leaders and Inspiring Change"
        description="Creating Leaders and Inspiring Change"
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
                <div className="dropdown-input" key={field.id}>
                  {dropdowns.map(dd => (
                    <div className="input-container" key={dd.id}>
                      <Dropdown
                        id={dd.id}
                        value={payloadData[dd.id]}
                        label={dd.label}
                        open={openVar[dd.open]}
                        handleClick={handleClick}
                        handleClose={handleClose}
                        anchor={anchorEl[dd.id]}
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
            {checkoutButtons.map(btn => (
              <Button
                key={btn.id}
                variant={btn.variant}
                size="large"
                sx={{ width: 180 }}
                color="info"
                onClick={e => onSubmit(e, btn.id)}
              >
                {btn.text}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
