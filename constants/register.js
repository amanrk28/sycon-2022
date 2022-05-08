const numericProps = { inputMode: 'numeric', pattern: '[0-9]*' };
const inputFields = [
  { id: 'fullName', label: 'Full Name', type: 'text', props: {} },
  { id: 'email', label: 'College Email ID', type: 'email', props: {} },
  { id: 'registerNumber', label: 'Register Number', type: 'text', props: {} },
  {
    id: 'phone',
    label: 'Phone Number',
    type: 'text',
    props: { maxLength: 10, ...numericProps },
  },
  {
    id: 'dropdown-inputs',
    label: 'Dropdown Inputs',
    type: 'dropdown',
    props: {},
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
];
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
];
const snuBranchNames = ['IoT', 'AI & DS', 'General/Hons', 'PA'];

const ssnDegreeNames = ['B.Tech', 'B.E.', 'M.E', 'M.Tech'];
const snuDegreeNames = ['B.Tech', 'B.Com'];

const collegeNames = ['SSN', 'SNU'];

const checkoutButtons = [
  { text: 'Pay Now', id: 'online-payment', variant: 'contained' },
  { text: 'Pay Later', id: 'offline-payment', variant: 'outlined' },
];

export {
  inputFields,
  checkoutButtons,
  snuBranchNames,
  snuDegreeNames,
  ssnBranchNames,
  ssnDegreeNames,
  collegeNames,
  mastersBranchNames,
};
