import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';
import { TextField, Menu, MenuItem, Button } from '@mui/material';
import { inputFields, branchNames, degreeNames } from 'constants/register';
import PageHead from 'components/PageHead';
import { sanitizeData } from 'utils/util';

const textFieldSx = { width: 400 };

const dropdowns = [
  { id: 'degree', label: 'Degree', list: degreeNames, open: 'openDegree' },
  { id: 'branch', label: 'Branch', list: branchNames, open: 'openBranch' },
];

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Register({ prices }) {
  const [payloadData, setPayloadData] = useState({
    fullName: '',
    email: '',
    registerNumber: '',
    phone: '',
    year: '',
    degree: '',
    branch: '',
    referralCode: '',
  });
  const [anchorElDegree, setAnchorElDegree] = useState(null);
  const [anchorElBranch, setAnchorElBranch] = useState(null);
  const openVar = {
    openDegree: Boolean(anchorElDegree),
    openBranch: Boolean(anchorElBranch),
  };
  const handleClick = (event, id) => {
    if (id === 'degree') setAnchorElDegree(event.currentTarget);
    else setAnchorElBranch(event.currentTarget);
  };

  const handleClose = (e, id) => {
    const value = e.target.getAttribute('name');
    if (value) setPayloadData({ ...payloadData, [id]: value });
    if (id === 'degree') setAnchorElDegree(null);
    else setAnchorElBranch(null);
  };

  const onChange = (event, key) => {
    const { value } = event.target;
    setPayloadData({ ...payloadData, [key]: value });
  };

  const onSubmit = async event => {
    event.preventDefault();
    const { data, errors } = sanitizeData(payloadData);
    console.log(data, errors);
    // const res = await axios({
    //   baseURL: window.location.origin,
    //   method: 'POST',
    //   url: '/api/checkout_session',
    //   data: {
    //     priceId: prices[0].id,
    //     email: data.email || '',
    //   },
    // });
    // window.location = res.data.url;
  };

  return (
    <>
      <PageHead
        title="SYCon2022 - Creating Leaders and Inspiring Change"
        description="Generated by create next app"
      />

      <div className="register-container">
        <div className="cover-container">
          <img src="/logo.svg" alt="SYCon" />
          <h1>SYCon</h1>
          <p>Creating leaders and inspiring change</p>
        </div>
        <div className="register-form">
          <h3>Student Registration</h3>
          <div className="input-fields">
            {inputFields.map(field => (
              <div className="input-container" key={field.id}>
                <TextField
                  sx={textFieldSx}
                  value={payloadData[field.id]}
                  type={field.type}
                  label={field.label}
                  onChange={e => onChange(e, field.id)}
                  inputProps={field.props}
                />
              </div>
            ))}

            <div className="dropdown-input">
              {dropdowns.map(dd => (
                <div className="input-container" key={dd.id}>
                  <TextField
                    disabled
                    value={payloadData[dd.id]}
                    label={dd.label}
                    id={`${dd.id}-button`}
                    onClick={e => handleClick(e, dd.id)}
                    aria-controls={
                      openVar[dd.open] ? `${dd.id}-menu` : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={openVar[dd.open] ? 'true' : undefined}
                  />
                  <Menu
                    id={`${dd.id}-menu`}
                    anchorEl={
                      dd.id === 'degree' ? anchorElDegree : anchorElBranch
                    }
                    open={openVar[dd.open]}
                    onClose={e => handleClose(e, dd.id)}
                    MenuListProps={{ 'aria-labelledby': 'degree-button' }}
                  >
                    {dd.list.map(item => (
                      <MenuItem
                        onClick={e => handleClose(e, dd.id)}
                        name={item}
                        key={item}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              ))}
            </div>
            <div className="input-container">
              <TextField
                sx={textFieldSx}
                value={payloadData.referralCode}
                label="Referral Code"
                onChange={e => onChange(e, 'referralCode')}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  maxLength: 4,
                }}
              />
            </div>
          </div>
          <div className="payment-container">
            <Button
              variant="contained"
              size="large"
              sx={{ width: 180 }}
              onClick={onSubmit}
            >
              Pay Now
            </Button>
            <Button variant="outlined" size="large" sx={{ width: 180 }}>
              Pay Later
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
