import { FieldValue } from 'firebase/firestore';

export enum Routes {
  Home = '/',
  Registration = '/register',
  Organizer = '/organizer',
  PaymentSuccess = '/success',
  RegistrationSuccess = '/registration-success',
  PaymentFailed = '/payment-failed',
  Auth = '/auth',
  Dashboard = '/dashboard',
}

export enum ApiRoutes {
  Razorpay = '/api/razorpay',
  Registration = '/api/registration',
  User = '/api/user',
}

export interface RegistrationApiPayload {
  email: string;
  fullName: string;
  registerNumber: string;
  year: string;
  degree: string;
  branch: string;
  phone: string;
  college: string;
  referral_code: number;
  paymentLink?: string;
  hasPaid: boolean;
  isEntry: boolean;
  isLunch: boolean;
  emailSent: boolean;
  updatedAt: FieldValue;
}

export interface UserApiPayload {
  branch: string;
  email: string;
  fullName: string;
  phone: string;
  referral_code: number;
  registrations: number;
  year: number;
}
