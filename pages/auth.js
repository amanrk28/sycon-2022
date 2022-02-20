import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import toast from 'react-hot-toast';
import { sendEmailVerification } from 'firebase/auth';
import { useAuth } from 'lib/AuthProvider';
import {
  loginFields,
  loginPayload,
  signupFields,
  signupPayload,
} from 'constants/auth';

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [authFields, setAuthFields] = useState(loginFields);
  const [state, setState] = useState(loginPayload);
  const router = useRouter();
  const { login, signup, addUserDetail, currentUser } = useAuth();
  useEffect(() => {
    if (currentUser) redirectUser(currentUser.uid);
  }, [redirectUser, currentUser]);

  const toggleAuth = () => {
    setIsSignup(prevState => {
      if (prevState) {
        setAuthFields(loginFields);
        setState(loginPayload);
      } else {
        setAuthFields(signupFields);
        setState(signupPayload);
      }
      return !prevState;
    });
  };

  const onChange = (e, key) => {
    setState({ ...state, [key]: e.target.value });
  };

  const redirectUser = useCallback(
    uid => {
      axios({
        baseUrl: window.location.origin,
        method: 'GET',
        url: `/api/user?uid=${uid}`,
      }).then(res => {
        router.push(`/dashboard?code=${res.data.referral_code}`);
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
    const { user } = await signup(state.email, state.password);
    if (user) {
      await sendEmailVerification(user);
      toast.success('Verification email sent!');
      await addUserDetail(user, state.full_name);
      axios({
        baseURL: window.location.origin,
        method: 'POST',
        url: '/api/user',
        data: {
          uid: user.uid,
          email: state['email'],
          fullName: state['full_name'],
          phone: state['phone_number'],
          registerNumber: state['reg_no'],
          year: state['year'],
          department: state['department'],
          registrations: 0, // default value for new oc member
        },
      })
        .then(() => {
          toast.success('Sign up successful!');
          redirectUser(user.uid);
        })
        .catch(() => {
          toast.error('Unable to post data');
        });
    }
  };

  const loginUser = async () => {
    let toastId;
    try {
      toastId = toast.loading('Signing in...');
      const { user } = await login(state.email, state.password);
      toast.dismiss(toastId);
      toast.success('Welcome Back!');
      if (user) redirectUser(user.uid);
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
      <div className="auth-wrapper">
        <div className="logo-container">
          <Image src="/logo.svg" alt="SYCon" width={127} height={53} />
        </div>
        {authFields.map(item => (
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
      </div>
    </div>
  );
}
