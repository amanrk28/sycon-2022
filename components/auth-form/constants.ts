export enum Login {
  Email = 'email',
  Password = 'password',
}

export const loginFieldsLabel = {
  [Login.Email]: 'Email',
  [Login.Password]: 'Password',
};

export enum SignUpField {
  Email = 'email',
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
  Fullname = 'fullName',
  Phone = 'phone',
  Year = 'year',
  Branch = 'branch',
}

export const signupFields = [
  { id: SignUpField.Fullname, label: 'Full Name', type: 'text' },
  { id: SignUpField.Email, label: 'Email', type: 'email' },
  { id: SignUpField.Password, label: 'Password', type: 'password' },
  {
    id: SignUpField.ConfirmPassword,
    label: 'Confirm Password',
    type: 'password',
  },
  {
    id: SignUpField.Phone,
    label: 'Phone',
    type: 'number',
  },
];
