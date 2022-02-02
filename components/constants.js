const inputFields = [
  { id: 'fullName', label: 'Full Name', type: 'text', props: {} },
  { id: 'email', label: 'College Email ID', type: 'email', props: {} },
  { id: 'registerNumber', label: 'Register Number', type: 'text', props: {} },
  {
    id: 'contact',
    label: 'Contact Number',
    type: 'text',
    props: { maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' },
  },
  {
    id: 'year',
    label: 'Year',
    type: 'text',
    props: { maxLength: 1, inputMode: 'numeric', pattern: '[0-9]*' },
  },
];

const branchNames = [
  'CSE',
  'IT',
  'EEE',
  'ECE',
  'Chemical',
  'BME',
  'Mechanical',
];

const degreeNames = ['B.Tech', 'B.E.'];

export { inputFields, branchNames, degreeNames };
