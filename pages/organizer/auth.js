import React, { useState } from 'react';
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
  p: 2,
  m: 10,
  border: '1px solid #ccc',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 2,
};

function generate4DigitNumber() {
  return Math.floor(Math.random() * 10000) + 1;
}

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [authType, setAuthType] = useState(loginFields);
  const [state, setState] = useState(loginPayload);
  const { login, signup } = useAuth();

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

  const onSubmit = async event => {
    event.preventDefault();
    if (isSignup) {
      if (!state.password.length > 0 || !state.confirmPassword.length > 0) {
        toast.error('Passwords not entered');
        return;
      }
      if (state.password !== state.confirmPassword) {
        console.log('Password Shit');
        toast.error('Passwords do not match');
        return;
      }
      const { user: currentUser } = await signup(state.email, state.password);
      if (currentUser) {
        console.log(currentUser);
        const username =
          state['full_name']
            .substring(0, 15)
            .toLowerCase()
            .replace(/\s/g, '_') + generate4DigitNumber();
        await sendEmailVerification(currentUser);
        toast.success('Verification email sent!');
        axios({
          baseURL: window.location.origin,
          method: 'POST',
          url: '/api/user',
          data: {
            uid: currentUser.uid,
            email: state['email'],
            username: username,
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
    } else {
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
    }
  };

  return (
    <div className="auth-container">
      <Box sx={BoxSx}>
        <img src="/logo.svg" alt="SYCon" />
        {authType.map(item => (
          <div className="input-container" key={item.id}>
            <TextField
              sx={{ width: 280 }}
              size="small"
              value={state[item.id]}
              type={item.type}
              label={item.label}
              onChange={e => onChange(e, item.id)}
              inputProps={item.props}
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
