type SignUpFields = {
  id: string;
  name: 'username' | 'email' | 'password' | 'confirmPassword';
  type: string;
  placeholder: string;
  required: boolean;
};

export const SIGN_UP_FIELDS: SignUpFields[] = [
  {
    id: '1',
    name: 'username',
    type: 'text',
    placeholder: 'Username',
    required: true,
  },
  {
    id: '2',
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    required: true,
  },
  {
    id: '3',
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    required: true,
  },
  {
    id: '4',
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm Password',
    required: true,
  },
];
