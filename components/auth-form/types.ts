import { AuthErrorCodes } from 'firebase/auth';

export interface Signup {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone: string;
  branch: string;
  year: string;
}

export interface SignIn {
  email: string;
  password: string;
}

export enum AuthType {
  Signin = 'signin',
  Signup = 'signup',
}

export const authTypeMessage = {
  [AuthType.Signin]: "Don't have an account yet?",
  [AuthType.Signup]: 'Already have an account?',
};

export const errorMessage = {
  [AuthErrorCodes.USER_DELETED]: 'Email not found! Did you mean to sign up?',
  [AuthErrorCodes.INVALID_PASSWORD]:
    'The password entered was incorrect or you have not verified your email yet.',
  [AuthErrorCodes.EMAIL_EXISTS]: 'Email already exists!!',
  unknown: 'An unexpected error has occurred. ☠️',
};
