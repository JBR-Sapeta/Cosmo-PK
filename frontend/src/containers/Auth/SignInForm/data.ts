type SignInFields = {
  id: string;
  name: 'email' | 'password';
  type: string;
  placeholder: string;
  required: boolean;
};

export const SIGN_IN_FIELDS: SignInFields[] = [
  {
    id: '1',
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    required: true,
  },
  {
    id: '2',
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    required: true,
  },
];
