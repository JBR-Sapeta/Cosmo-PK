import { isEmpty } from 'ramda';
import type { SignUpData } from './SignUpForm';

export function validateInputs({
  username,
  email,
  password,
  confirmPassword,
}: SignUpData) {
  const usernameMsg = validateUsername(username);
  const emailMsg = validateEmail(email);
  const passwordMsg = validatePassword(password);
  const confirmPasswordMsg = validateConfirmPassword(password, confirmPassword);

  if (
    isEmpty(usernameMsg) &&
    isEmpty(emailMsg) &&
    isEmpty(passwordMsg) &&
    isEmpty(confirmPasswordMsg)
  ) {
    return null;
  }

  return {
    username: usernameMsg,
    email: emailMsg,
    password: passwordMsg,
    confirmPassword: confirmPasswordMsg,
  };
}

function validateEmail(email: string): string {
  const regex = /^\S+@\S+\.\S+$/;
  const message = 'Please enter correct email address.';
  return regex.test(email) ? '' : message;
}

function validateUsername(username: string): string {
  return username.length >= 3 ? '' : 'Username is to short.';
}

function validatePassword(password: string): string {
  return password.length >= 8
    ? ''
    : 'Password must be at least 8 characters long.';
}

function validateConfirmPassword(
  password: string,
  confirmPassword: string
): string {
  return password === confirmPassword ? '' : "Password don't match.";
}
