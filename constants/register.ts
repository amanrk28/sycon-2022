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

export enum SsnBranch {
  Cse = 'CSE',
  It = 'IT',
  Ece = 'ECE',
  Eee = 'EEE',
  Mechanical = 'Mechanical',
  Bme = 'BME',
  Civil = 'Civil',
  Chemical = 'Chemical',
}

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

export enum BachelorsDegree {
  Btech = 'B.Tech',
  Be = 'B.E',
}

export enum SnuDegree {
  Btech = 'B.Tech',
  Bcom = 'B.Com',
}

export type Degree = BachelorsDegree | MastersDegree | SnuDegree;

const ssnDegreeNames = ['B.Tech', 'B.E.', 'M.E', 'M.Tech'].map(arrFieldMap);
const snuDegreeNames = ['B.Tech', 'B.Com'].map(arrFieldMap);

export enum College {
  Ssn = 'SSN',
  Snu = 'SNU',
}

const collegeNames = ['SSN', 'SNU'].map(arrFieldMap);

const yearList = ['1', '2', '3', '4'].map(arrFieldMap);

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
