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
];

const authFields = { login: loginFields, signup: signupFields };

const loginPayload = { email: '', password: '' };
const signupPayload = {
  email: '',
  password: '',
  confirmPassword: '',
  full_name: '',
  phone_number: '',
};

const ADMIN_USERS = ['amankhemka.ak28@gmail.com'];

export { loginPayload, signupPayload, authFields, ADMIN_USERS };
