import { AuthErrorCodes, sendEmailVerification } from 'firebase/auth';
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
  errorMessage,
  Signup,
  authTypeMessage,
} from 'components/auth-form';
import PageHead from 'components/PageHead';
import { createUser, getUser } from 'components/auth-form/api';
import { Routes } from 'components/types';
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
      getUser(uid).then(res => {
        if (res.data.isAdmin) {
          router.push(Routes.Organizer);
        } else {
          router.push(`${Routes.Dashboard}/${res.data.referral_code}`);
        }
        setLoading(false);
      });
    },
    [router]
  );

  useEffect(() => {
    if (currentUser) {
      redirectUser(currentUser.uid);
    }
  }, [redirectUser, currentUser]);

  const toggleAuth = useCallback(() => {
    setAuthType(prevState => {
      if (prevState === AuthType.Signup) {
        return AuthType.Signin;
      }
      return AuthType.Signup;
    });
  }, []);

  const signupUser = async ({
    email,
    password,
    ...rest
  }: Omit<Signup, 'confirmPassword'>) => {
    setLoading(true);
    try {
      const { user } = await signup(email, password);
      if (!user) return;
      const userData = {
        uid: user.uid,
        email,
        ...rest,
      };
      toast.promise(sendEmailVerification(user), {
        loading: 'Sending verification email...',
        success: 'Verification mail sent!',
        error: 'Error sending verification email',
      });
      await addUserDetail(user, rest.fullName);
      toast.dismiss();
      toast.promise(
        createUser(userData),
        {
          loading: 'Loading...',
          success: res => {
            redirectUser(user.uid);
            return res.data.isAdmin
              ? `Signed up successfully. Preparing your dashboard...`
              : `Signed up successfully. Your referral code is ${res.data.referralCode}`;
          },
          error: 'Unable to create user',
        },
        { duration: 10000 }
      );
    } catch (err: any) {
      setLoading(false);
      switch (err.code) {
        case AuthErrorCodes.EMAIL_EXISTS:
          return toast.error(errorMessage[AuthErrorCodes.EMAIL_EXISTS]);
        default:
          return toast.error(errorMessage.unknown);
      }
    }
  };

  const loginUser = async ({ email, password }: SignIn) => {
    try {
      setLoading(true);
      const { user } = await login(email, password);
      toast.success('Welcome Back!');
      if (user) {
        redirectUser(user.uid);
      }
    } catch (err: any) {
      setLoading(false);
      switch (err.code) {
        case AuthErrorCodes.USER_DELETED:
          return toast.error(errorMessage[AuthErrorCodes.USER_DELETED]);
        case AuthErrorCodes.INVALID_PASSWORD:
          return toast.error(errorMessage[AuthErrorCodes.INVALID_PASSWORD]);
        default:
          return toast.error(errorMessage.unknown);
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
