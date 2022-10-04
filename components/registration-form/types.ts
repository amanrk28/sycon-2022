export interface RazorpaySuccesshandlerArgs {
  razorpay_signature: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
}

export interface PayloadData {
  fullName: string;
  email: string;
  registerNumber: string;
  phone: string;
  year: string;
  college: string;
  degree: string;
  branch: string;
  referralCode: string;
}

export enum Fields {
  FullName = 'fullName',
  Email = 'email',
  RegisterNumber = 'registerNumber',
  Phone = 'phone',
  Year = 'year',
  College = 'college',
  Degree = 'degree',
  Branch = 'branch',
  ReferralCode = 'referralCode',
}

export enum PaymentMode {
  Online = 'online-payment',
  Offline = 'offline-payment',
}
