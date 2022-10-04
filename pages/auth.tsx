import axios from 'axios';
import { sendEmailVerification } from 'firebase/auth';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import {
  SigninForm,
  SignupForm,
  SignIn,
  AuthType,
  ErrorCode,
  errorMessage,
  Signup,
  authTypeMessage,
} from 'components/auth-form';
import PageHead from 'components/PageHead';
import { useAuth } from 'lib/AuthProvider';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  min-width: 100vw;
  background-image: linear-gradient(to right, #a855f7, #d946ef);
  @media screen and (max-width: 500px) {
    background: #fff;
  }
`;

const AuthBox = styled.div`
  padding: 32px;
  margin: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  background: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  @media screen and (max-width: 500px) {
    margin: 0;
    box-shadow: none;
  }
`;

const LogoBox = styled.div`
  margin: 32px 0;
`;

const Paragraph = styled.p`
  span {
    color: #1876d1;
    cursor: pointer;
  }
`;

const Auth: NextPage = () => {
  const [authType, setAuthType] = useState<AuthType>(AuthType.Signin);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, signup, addUserDetail, currentUser } = useAuth();
  const redirectUser = useCallback(
    (uid: string) => {
      setLoading(true);
      axios({
        baseURL: window.location.origin,
        method: 'GET',
        url: `/api/user?uid=${uid}`,
      }).then(res => {
        setLoading(false);
        if (res.data.isAdmin) {
          router.push('/event_head');
        } else {
          router.push(`/dashboard/${res.data.referral_code}`);
        }
      });
    },
    [router]
  );

  useEffect(() => {
    if (currentUser) {
      redirectUser(currentUser.uid);
    }
  }, [redirectUser, currentUser]);

  const toggleAuth = () => {
    setAuthType(prevState => {
      if (prevState === AuthType.Signup) {
        return AuthType.Signin;
      }
      return AuthType.Signup;
    });
  };

  const signupUser = async ({
    email,
    password,
    ...rest
  }: Omit<Signup, 'confirmPassword'>) => {
    setLoading(true);
    const { user } = await signup!(email, password);
    if (user) {
      const userData = {
        uid: user.uid,
        email,
        ...rest,
      };
      await sendEmailVerification(user);
      toast.success('Verification email sent!');
      await addUserDetail!(user, rest.fullName);
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
          redirectUser(user.uid);
        })
        .catch(() => {
          toast.error('Unable to post data');
        });
    }
  };

  const loginUser = async ({ email, password }: SignIn) => {
    try {
      setLoading(true);
      const { user } = await login!(email, password);
      toast.success('Welcome Back!');
      if (user) {
        redirectUser(user.uid);
      }
    } catch (err: any) {
      setLoading(false);
      switch (err.code) {
        case ErrorCode.UserNotFound:
          toast.error(errorMessage[ErrorCode.UserNotFound]);
        case ErrorCode.WrongPassword:
          toast.error(errorMessage[ErrorCode.WrongPassword]);
        default:
          toast.error(errorMessage[ErrorCode.UnknownError]);
      }
    }
  };

  return (
    <>
      <PageHead
        title="Login/Signup to view your referrals"
        description="Login/Signup to view your referrals"
      />
      <Container>
        <AuthBox>
          <LogoBox>
            <Image src="/logo.svg" alt="SYCon" width={127} height={53} />
          </LogoBox>
          {authType === AuthType.Signup ? (
            <SignupForm onSubmit={signupUser} isLoading={loading} />
          ) : (
            <SigninForm onSubmit={loginUser} isLoading={loading} />
          )}
          <Paragraph>
            {authTypeMessage[authType]}&nbsp;
            <span onClick={toggleAuth}>
              {authType === AuthType.Signup ? 'Sign in' : 'Sign up'}
            </span>
          </Paragraph>
        </AuthBox>
      </Container>
    </>
  );
};

export default Auth;