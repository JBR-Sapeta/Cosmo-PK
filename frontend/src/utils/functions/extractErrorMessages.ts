import { AxiosError } from 'axios';
import { ErrorMessage, ValidationError } from '../types';
import { isNil } from 'ramda';

/**
 * Extracts validation error messages from Axios error object.
 * @param {T} emptyErrorState empty errorState.
 * @param {AxiosError<Partial<T>>} error Axios Error object.
 * @returns {T} error state with data extracted from Axios error object.
 */
export function extractErrorMessages<T>(
  error: AxiosError<ValidationError<Partial<T | string> | ErrorMessage>>
): string {
  if (isNil(error) || isNil(error.response) || isNil(error.response.data)) {
    return '';
  }

  const { message } = error.response.data;

  if (typeof message === 'object') {
    return Object.values(message).join('\n');
  }

  if (typeof message !== 'object') {
    return message;
  }

  return '';
}
