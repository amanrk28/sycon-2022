const loginFields = [
  { id: 'email', label: 'Email', type: 'email', props: {} },
  { id: 'password', label: 'Password', type: 'password', props: {} },
];

const signupFields = [
  { id: 'email', label: 'Email', type: 'email', props: {} },
  { id: 'password', label: 'Password', type: 'password', props: {} },
  {
    id: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    props: {},
  },
  { id: 'full_name', label: 'Full Name', type: 'text', props: {} },
  {
    id: 'phone_number',
    label: 'Phone No.',
    type: 'text',
    props: { maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' },
  },
  {
    id: 'reg_no',
    label: 'Register No.',
    type: 'text',
    props: { maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' },
  },
  { id: 'department', label: 'Department', type: 'text', props: {} },
  {
    id: 'year',
    label: 'Year',
    type: 'text',
    props: { maxLength: 1, inputMode: 'numeric', pattern: '[0-9]*' },
  },
];

const loginPayload = { email: '', password: '' };
const signupPayload = {
  email: '',
  password: '',
  confirmPassword: '',
  full_name: '',
  phone_number: '',
  reg_no: '',
  department: '',
  year: '1',
};

export { loginFields, loginPayload, signupFields, signupPayload };
