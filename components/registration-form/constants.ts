import content from 'users.json';

export const rcList = content.users.map(x => ({
  key: x.referral_code,
  label: `${x.fullName} - ${x.referral_code}`,
  value: x.referral_code,
}));

export const dropdownRules = [{ required: true }];

const arrFieldMap = (x: string) => ({ key: x, label: x, value: x });
const inputFields = [
  { id: 'fullName', label: 'Full Name', type: 'text' },
  { id: 'email', label: 'College Email ID', type: 'email' },
  { id: 'registerNumber', label: 'Register Number', type: 'number' },
  {
    id: 'phone',
    label: 'Phone Number',
    type: 'number',
    max: 10,
  },
];

const ssnBranchNames = [
  'CSE',
  'IT',
  'ECE',
  'EEE',
  'Mechanical',
  'BME',
  'Civil',
  'Chemical',
].map(arrFieldMap);

const mastersBranchNames = [
  'Communication Systems',
  'Computer Science & Engineering',
  'Applied Electronics',
  'Power Electronics & Drives',
  'VLSI Design',
  'Energy Engineering',
  'Manufacturing Engineering',
  'Medical Electronics',
  'Information Technology',
  'Environmental Science & Technology',
].map(arrFieldMap);

const snuBranchNames = ['IoT', 'AI & DS', 'General/Hons', 'PA'].map(
  arrFieldMap
);

export enum MastersDegree {
  Me = 'M.E',
  Mtech = 'M.Tech',
}

const ssnDegreeNames = ['B.Tech', 'B.E.', 'M.E', 'M.Tech'].map(arrFieldMap);
const snuDegreeNames = ['B.Tech', 'B.Com'].map(arrFieldMap);
const collegeNames = ['SSN', 'SNU'].map(arrFieldMap);
const yearList = ['1', '2', '3', '4'].map(arrFieldMap);

export enum College {
  Ssn = 'SSN',
  Snu = 'SNU',
}

export {
  inputFields,
  snuBranchNames,
  snuDegreeNames,
  ssnBranchNames,
  ssnDegreeNames,
  collegeNames,
  mastersBranchNames,
  yearList,
};
