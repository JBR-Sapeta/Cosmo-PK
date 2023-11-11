import type { SignUpFormData } from './SignUpForm';

export const SIGN_UP_FIELDS = [
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

export function validateEmail({ email }: SignUpFormData): string {
  const regex = /^\S+@\S+\.\S+$/;
  const message = 'Please enter correct email address.';
  return regex.test(email) ? '' : message;
}

export function validateUsername({ username }: SignUpFormData): string {
  return username.length >= 3
    ? ''
    : 'A username must be at least 3 characters long.';
}

export function validatePassword({ password }: SignUpFormData): string {
  return password.length >= 8
    ? ''
    : 'A password must be at least 8 characters long.';
}

export function validateConfirmPassword({
  password,
  confirmPassword,
}: SignUpFormData): string {
  return password === confirmPassword ? '' : "Passwords don't match.";
}
