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
    data.fullName = data.fullName
      .split(' ')
      .map((x: string) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
      .join(' ');
  }
  // Format email
  if (data.email) data.email = data.email.trim();

  return { data };
};

export const generate4DigitNumber = () => {
  return Math.floor(Math.random() * 10000) + 1;
};

export const checkIfUserExists = async (
  regNo: string
): Promise<{ isUser: boolean; userData: any | null }> => {
  try {
    const q = query(
      collection(firestore, 'registrations'),
      where('registerNumber', '==', regNo)
    );
    const existingReg = await getDocs(q);
    if (existingReg.empty) {
      return { isUser: false, userData: null };
    }
    return {
      isUser: true,
      userData: existingReg.docs[0].data(),
    };
  } catch (err) {
    console.log(err);
    return { isUser: false, userData: null };
  }
};

export const generateUsername = (name: string) =>
  name.substring(0, 15).toLowerCase().replace(/\s/g, '_') +
  generate4DigitNumber();
