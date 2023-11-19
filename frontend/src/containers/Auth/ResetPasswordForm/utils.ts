import { isEmpty } from 'ramda';
import type { ResetPasswordData } from './ResetPasswordFrom';

export function validateInputs({
  password,
  confirmPassword,
}: ResetPasswordData) {
  const passwordMsg = validatePassword(password);
  const confirmPasswordMsg = validateConfirmPassword(password, confirmPassword);

  if (isEmpty(passwordMsg) && isEmpty(confirmPasswordMsg)) {
    return null;
  }

  return {
    password: passwordMsg,
    confirmPassword: confirmPasswordMsg,
  };
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
