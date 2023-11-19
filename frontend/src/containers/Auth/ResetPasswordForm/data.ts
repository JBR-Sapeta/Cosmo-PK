type ResetPasswordFields = {
  id: string;
  name: 'password' | 'confirmPassword';
  type: string;
  placeholder: string;
  required: boolean;
};

export const RESET_PASSWORD_FIELDS: ResetPasswordFields[] = [
  {
    id: '1',
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    required: true,
  },
  {
    id: '2',
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm Password',
    required: true,
  },
];
