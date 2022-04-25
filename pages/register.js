import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import toast from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { collection, getDocs, query, where } from 'firebase/firestore';
import PageHead from 'components/PageHead';
import {
  inputFields,
  checkoutButtons,
  snuBranchNames,
  snuDegreeNames,
  ssnBranchNames,
  ssnDegreeNames,
  collegeNames,
} from 'constants/register';
import { sanitizeData, generate4DigitNumber, loadScript } from 'utils/util';
import { setSs, ssKeys, getSs, clearSs } from 'utils/ssUtil';
import content from '../users.json';
import { firestore } from 'lib/firebase';

const Dropdown = dynamic(() => import('components/Dropdown'));
const Modal = dynamic(() => import('components/Modal'));

const rcList = content.users.map(x => `${x.fullName} - ${x.referral_code}`);

async function checkIfUserExists(regNo) {
  try {
    const q = query(
      collection(firestore, 'registrations'),
      where('registerNumber', '==', regNo)
    );
    const existingReg = await getDocs(q);
    if (!existingReg.empty) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return;
  }
}

export default function Register() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    referralCode: null,
  });
  const openVar = {
    openDegree: Boolean(anchorEl.degree),
    openBranch: Boolean(anchorEl.branch),
    openCollege: Boolean(anchorEl.college),
    openReferralCode: Boolean(anchorEl.referralCode),
  };
  const handleClick = (event, id) => {
    setAnchorEl({ ...anchorEl, [id]: event.currentTarget });
  };

  const handleClose = (e, id) => {
    let value = e.target.getAttribute('name');
    if (value) {
      if (id === 'referralCode') {
        value = parseInt(value.slice(-4), 10);
      }
      setPayloadData({ ...payloadData, [id]: value });
    }
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
      setIsModalOpen(false);
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
    setIsModalOpen(false);
    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', res => {
      toast.error(res.error.description);
    });
    paymentObject.open();
  }

  const onSubmit = async (event, paymentMode) => {
    event.preventDefault();
    setIsModalOpen(true);
    const { data, errors } = sanitizeData(payloadData);
    setError(errors);
    if (Object.values(errors).includes(true)) {
      setIsModalOpen(false);
      if (errors.email) toast.error('Enter your college email ID to continue');
      else if (errors.phone) toast.error('Enter a valid Phone Number');
      else toast.error('Fill all fields to continue');
      return;
    } else {
      setPayloadData(data);
      const username =
        data.fullName.substring(0, 15).toLowerCase().replace(/\s/g, '_') +
        generate4DigitNumber();
      const doesExist = await checkIfUserExists(data.registerNumber);
      if (doesExist) {
        toast.error('Registration already done. Cannot register again');
        setIsModalOpen(false);
        return;
      } else {
        setSs(ssKeys.firebaseRegUserRef, username);
        await axios({
          baseURL: window.location.origin,
          method: 'POST',
          url: '/api/registration',
          data: { ...data, username },
        });
        if (paymentMode === 'online-payment') displayRazorPay(data);
        else {
          setIsModalOpen(false);
          router.push('/registration_success');
        }
      }
    }
  };

  return (
    <>
      <PageHead
        title="SYCon2022 - Creating Leaders and Inspiring Change"
        description="Creating Leaders and Inspiring Change"
      />
      {isModalOpen && <Modal isOpen={isModalOpen} />}
      <div className="register-container">
        <div className="cover-container">
          <div className="top">
            <Image src="/logo.svg" alt="SYCon" width={165} height={69} />
            <h1>SYCon Ticketing</h1>
            <h3>Creating leaders & Inspiring change</h3>
          </div>
          {/* <div className="sponsor-container">
            <div>
              <p>Title Sponsor</p>
              <Image src="/logo.svg" alt="SYCon" width={165} height={69} />
            </div>
            <div className="divider"></div>
            <div>
              <p>Official Sponsor</p>
              <div className="sponsor-images">
                <Image src="/logo.svg" alt="SYCon" width={165} height={69} />
                <Image src="/logo.svg" alt="SYCon" width={165} height={69} />
              </div>
            </div>
          </div> */}
        </div>
        <div className="register-form">
          <h3>Student Registration</h3>
          <div className="input-fields">
            {inputFields.map(field => {
              return field.id === 'dropdown-inputs' ? (
                <Fragment key={field.id}>
                  <div className="dropdown-input">
                    <div className="input-container">
                      <Dropdown
                        id="college"
                        value={payloadData.college}
                        label="College"
                        open={openVar.openCollege}
                        handleClick={handleClick}
                        handleClose={handleClose}
                        anchor={anchorEl.college}
                        error={error.college}
                        list={collegeNames}
                      />
                    </div>
                    <div className="input-container">
                      <Dropdown
                        id="degree"
                        value={payloadData.degree}
                        label="Degree"
                        open={openVar.openDegree}
                        handleClick={handleClick}
                        handleClose={handleClose}
                        anchor={anchorEl.degree}
                        error={error.degree}
                        list={
                          payloadData.college === 'SSN'
                            ? ssnDegreeNames
                            : snuDegreeNames
                        }
                      />
                    </div>
                    <div className="input-container">
                      <Dropdown
                        id="branch"
                        value={payloadData.branch}
                        label="Branch"
                        open={openVar.openBranch}
                        handleClick={handleClick}
                        handleClose={handleClose}
                        anchor={anchorEl.branch}
                        error={error.branch}
                        list={
                          payloadData.college === 'SSN'
                            ? ssnBranchNames
                            : snuBranchNames
                        }
                      />
                    </div>
                  </div>
                  <div className="input-container">
                    <Dropdown
                      sx={{ width: 400 }}
                      id="referralCode"
                      value={payloadData.referralCode}
                      label="Referral Code"
                      open={openVar.openReferralCode}
                      handleClick={handleClick}
                      handleClose={handleClose}
                      anchor={anchorEl.referralCode}
                      error={error.referralCode}
                      list={rcList}
                    />
                  </div>
                </Fragment>
              ) : (
                <div className="input-container" key={field.id}>
                  <TextField
                    sx={{ width: 400 }}
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
