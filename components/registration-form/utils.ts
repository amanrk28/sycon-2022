import { firestore } from 'lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { PayloadData } from './types';

export const inputValidator = (field: string) => (_: any, value: any) => {
  if (field === 'phone' && !value.match(/^\d{10}$/)) {
    return Promise.reject(new Error('Enter a valid phone number'));
  }
  if (field === 'email') {
    if (
      !value.toLowerCase().includes(ssnDomain) &&
      !value.toLowerCase().includes(snuDomain)
    )
      return Promise.reject(new Error('Enter your college email'));
  }
  return Promise.resolve();
};

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

export async function checkIfUserExists(regNo: string) {
  try {
    const q = query(
      collection(firestore, 'registrations'),
      where('registerNumber', '==', regNo)
    );
    const existingReg = await getDocs(q);
    if (!existingReg.empty) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return;
  }
}

export const generateUsername = (name: string) =>
  name.substring(0, 15).toLowerCase().replace(/\s/g, '_') +
  generate4DigitNumber();
