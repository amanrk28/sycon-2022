import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, Box, TextField } from '@mui/material';
import toast from 'react-hot-toast';
import { sendEmailVerification } from 'firebase/auth';
import { useAuth } from 'lib/AuthProvider';
import {
  loginFields,
  loginPayload,
  signupFields,
  signupPayload,
} from 'constants/auth';

const BoxSx = {
  p: 4,
  m: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 2,
  background: 'white',
};

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [authType, setAuthType] = useState(loginFields);
  const [state, setState] = useState(loginPayload);
  const { login, signup, addUserDetail, currentUser } = useAuth();

  const router = useRouter();
  // useEffect(() => {
  //   if (currentUser) router.push('/register');
  // }, [currentUser, router]);

  const toggleAuth = () => {
    setIsSignup(prevState => {
      if (prevState) {
        setAuthType(loginFields);
        setState(loginPayload);
      } else {
        setAuthType(signupFields);
        setState(signupPayload);
      }
      return !prevState;
    });
  };

  const onChange = (e, key) => {
    setState({ ...state, [key]: e.target.value });
  };

  const signupUser = async () => {
    if (!state.password.length > 0 || !state.confirmPassword.length > 0) {
      toast.error('Passwords not entered');
      return;
    }
    if (state.password !== state.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    const { user: currentUser } = await signup(state.email, state.password);
    if (currentUser) {
      await sendEmailVerification(currentUser);
      toast.success('Verification email sent!');
      await addUserDetail(currentUser, state.full_name);
      axios({
        baseURL: window.location.origin,
        method: 'POST',
        url: '/api/user',
        data: {
          uid: currentUser.uid,
          email: state['email'],
          fullName: state['full_name'],
          phone: state['phone_number'],
          registerNumber: state['reg_no'],
          year: state['year'],
          department: state['department'],
        },
      })
        .then(() => {
          toast.success('Sign up successful!');
        })
        .catch(() => {
          toast.error('Unable to post data');
        });
    }
  };

  const loginUser = async () => {
    let toastId;
    try {
      toastId = toast.loading('Signing in..');
      await login(state.email, state.password);
      toast.dismiss(toastId);
      toast.success('Success!');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        toast.error('Email not found! Did you mean to sign up?');
      } else if (err.code === 'auth/wrong-password') {
        toast(
          'The password entered was incorrect or you have not verified your email yet.',
          {
            duration: 7000,
            icon: '❌',
          }
        );
      } else {
        toast.error('An unexpected error has occurred. ☠️');
      }
      toast.dismiss(toastId);
    }
  };

  const onSubmit = event => {
    event.preventDefault();
    if (isSignup) signupUser();
    else loginUser();
  };

  return (
    <div className="auth-container">
      <Box sx={BoxSx}>
        <div className="logo-container">
          <Image src="/logo.svg" alt="SYCon" width={127} height={53} />
        </div>
        {authType.map(item => (
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
          {isSignup ? 'Signup' : 'Login'}
        </Button>
        <p>
          {isSignup ? 'Already have an account?' : "Don't have an account yet?"}
          &nbsp;
          <span onClick={toggleAuth}>{isSignup ? 'Login' : 'Signup'}</span>
        </p>
      </Box>
    </div>
  );
}
