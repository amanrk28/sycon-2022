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

export enum ErrorCode {
  UserNotFound = 'auth/user-not-found',
  WrongPassword = 'auth/wrong-password',
  UnknownError = 'unknown',
}

export const errorMessage = {
  [ErrorCode.UserNotFound]: 'Email not found! Did you mean to sign up?',
  [ErrorCode.WrongPassword]:
    'The password entered was incorrect or you have not verified your email yet.',
  [ErrorCode.UnknownError]: 'An unexpected error has occurred. ☠️',
};
