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
    id: 'year',
    label: 'Year',
    type: 'text',
    props: { maxLength: 1, ...numericProps },
  },
  {
    id: 'dropdown-inputs',
    label: 'Dropdown Inputs',
    type: 'dropdown',
    props: {},
  },
  {
    id: 'referralCode',
    label: 'Referral Code',
    type: 'text',
    props: { maxLength: 4, ...numericProps },
  },
];

const branchNames = [
  'CSE',
  'IT',
  'ECE',
  'EEE',
  'Mechanical',
  'BME',
  'Civil',
  'Chemical',
];

const degreeNames = ['B.Tech', 'B.E.'];
const collegeNames = ['SSN', 'SNU'];

const dropdowns = [
  { id: 'college', label: 'College', list: collegeNames, open: 'openCollege' },
  { id: 'degree', label: 'Degree', list: degreeNames, open: 'openDegree' },
  { id: 'branch', label: 'Branch', list: branchNames, open: 'openBranch' },
];

export { inputFields, dropdowns };
