import { firestore } from 'lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import content from 'users.json';
import { ssnDomain, snuDomain } from 'utils/util';

export const rcList = content.users.map(x => ({
  key: x.referral_code,
  label: `${x.fullName} - ${x.referral_code}`,
}));

export const dropdownRules = [{ required: true }];

export const inputValidator = (field: string) => (_, value: any) => {
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
