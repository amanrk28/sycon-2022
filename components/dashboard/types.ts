export interface ReferralsColumn {
  key: string;
  fullName: string;
  year: string;
  branch: string;
  paymentMode: string;
}

export interface LeaderboardColumn {
  key: string;
  position: number;
  fullName: string;
  registrations: number;
}

export interface PaymentType {
  cash: number;
  online: number;
}
