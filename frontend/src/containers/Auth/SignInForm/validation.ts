import { isEmpty } from 'ramda';
import type { SignInData } from './SignInForm';

export function validateInputs({ email, password }: SignInData) {
  const emailMsg = validateEmail(email);
  const passwordMsg = validatePassword(password);

  if (isEmpty(emailMsg) && isEmpty(passwordMsg)) {
    return null;
  }

  return {
    email: emailMsg,
    password: passwordMsg,
  };
}

function validateEmail(email: string): string {
  const regex = /^\S+@\S+\.\S+$/;
  const message = 'Please enter correct email address.';
  return regex.test(email) ? '' : message;
}

function validatePassword(password: string): string {
  return isEmpty(password) ? 'Please enter your password.' : '';
}
