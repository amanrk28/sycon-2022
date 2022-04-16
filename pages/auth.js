import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import toast from 'react-hot-toast';
import { sendEmailVerification } from 'firebase/auth';
import { useAuth } from 'lib/AuthProvider';
import { loginPayload, signupPayload, authFields } from 'constants/auth';
import { sanitizeAuthData } from 'utils/util';

const PageHead = dynamic(() => import('components/PageHead'));
const Modal = dynamic(() => import('components/Modal'));

export default function Auth() {
  const [authType, setAuthType] = useState('login');
  const [state, setState] = useState(loginPayload);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { login, signup, addUserDetail, currentUser } = useAuth();
  useEffect(() => {
    if (currentUser) {
      redirectUser({ uid: currentUser.uid });
    }
  }, [redirectUser, currentUser]);

  const toggleAuth = () => {
    setAuthType(prevState => {
      if (prevState === 'signup') {
        setState(loginPayload);
        return 'login';
      }
      setState(signupPayload);
      return 'signup';
    });
  };

  const onChange = (e, key) => {
    setState({ ...state, [key]: e.target.value });
  };

  const redirectUser = useCallback(
    ({ uid }) => {
      setIsModalOpen(true);
      axios({
        baseUrl: window.location.origin,
        method: 'GET',
        url: `/api/user?uid=${uid}`,
      }).then(res => {
        setIsModalOpen(false);
        if (res.data.isAdmin) {
          router.push('/event_head');
        } else {
          router.push(`/dashboard/${res.data.referral_code}`);
        }
      });
    },
    [router]
  );

  const signupUser = async () => {
    if (!state.password.length > 0 || !state.confirmPassword.length > 0) {
      toast.error('Passwords not entered');
      return;
    }
    if (state.password !== state.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    const { errors } = sanitizeAuthData(state);
    if (errors.phone_number) {
      toast.error('Enter a valid a phone number');
      return;
    }
    if (errors.email) {
      toast.error('Enter your college email to continue');
      return;
    }
    if (errors.year) {
      toast.error('Enter a valid year of study');
      return;
    }
    setIsModalOpen(true);
    const { user } = await signup(state.email, state.password);
    if (user) {
      let userData = {
        uid: user.uid,
        email: state['email'],
        fullName: state['full_name'],
        phone: state['phone_number'],
        branch: state['branch'],
        year: state['year'],
      };
      await sendEmailVerification(user);
      toast.success('Verification email sent!');
      await addUserDetail(user, state.full_name);
      axios({
        baseURL: window.location.origin,
        method: 'POST',
        url: '/api/user',
        data: userData,
      })
        .then(res => {
          toast.success(
            `Sign up successful! Your Referral Code is ${res.data.referralCode}`
          );
          redirectUser({ uid: user.uid });
        })
        .catch(() => {
          toast.error('Unable to post data');
        });
    }
  };

  const loginUser = async () => {
    try {
      setIsModalOpen(true);
      const { user } = await login(state.email, state.password);
      toast.success('Welcome Back!');
      if (user) {
        redirectUser({ uid: user.uid });
      }
    } catch (err) {
      setIsModalOpen(false);
      if (err.code === 'auth/user-not-found') {
        toast.error('Email not found! Did you mean to sign up?');
      } else if (err.code === 'auth/wrong-password') {
        toast.error(
          'The password entered was incorrect or you have not verified your email yet.'
        );
      } else {
        toast.error('An unexpected error has occurred. ☠️');
      }
    }
  };

  const onSubmit = event => {
    event.preventDefault();
    if (authType === 'signup') signupUser();
    else loginUser();
  };

  return (
    <>
      <PageHead
        title="Login/Signup to view your referrals"
        description="Login/Signup to view your referrals"
      />
      {isModalOpen && <Modal isOpen={isModalOpen} />}
      <div className="auth-container">
        <div className="auth-wrapper">
          <div className="logo-container">
            <Image src="/logo.svg" alt="SYCon" width={127} height={53} />
          </div>
          {authFields[authType].map(item => (
            <div className="input-container" key={item.id}>
              <TextField
                sx={{ width: 300 }}
                size="small"
                value={state[item.id]}
                type={item.type}
                label={item.label}
                onChange={e => onChange(e, item.id)}
                inputProps={item.props}
                variant="standard"
              />
            </div>
          ))}
          <Button
            variant="contained"
            sx={{ width: 180, m: 3 }}
            onClick={onSubmit}
          >
            {authType === 'signup' ? 'Signup' : 'Login'}
          </Button>
          {/*
          ---------------Enable this for SIGNUP------------------
          */}
          {/* <p>
            {authType === 'signup'
              ? 'Already have an account?'
              : "Don't have an account yet?"}
            &nbsp;
            <span onClick={toggleAuth}>
              {authType === 'signup' ? 'Login' : 'Signup'}
            </span>
          </p> */}
        </div>
      </div>
    </>
  );
}
