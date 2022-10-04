import { PayloadData } from 'components/registration-form';

export const ssnDomain = 'ssn.edu.in';
export const snuDomain = 'snuchennai.edu.in';

export const sanitizeData = (data: PayloadData) => {
  // Format Full Name
  if (data.fullName) {
    let x = data.fullName.split(' ');
    x = x.map((item: string) => item[0].toUpperCase() + item.substr(1));
    data.fullName = x.join(' ');
  }
  // Format email
  if (data.email) data.email = data.email.trim();
  return { data };
};

export const generate4DigitNumber = () => {
  return Math.floor(Math.random() * 10000) + 1;
};
