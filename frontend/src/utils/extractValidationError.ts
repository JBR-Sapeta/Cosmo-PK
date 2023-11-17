import { AxiosError } from 'axios';
import { Nullish, ValidationError } from './types';
import { isNil } from 'ramda';

/**
 * Extracts validation error messages from Axios error object.
 * @param {T} emptyErrorState empty errorState.
 * @param {AxiosError<Partial<T>>} error Axios Error object.
 * @returns {T} error state with data extracted from Axios error object.
 */
export function extractValidationError<T>(
  emptyErrorState: T,
  error: Nullish<AxiosError<ValidationError<Partial<T | string>>>>
): T {
  if (isNil(error) || isNil(error.response) || isNil(error.response.data)) {
    return emptyErrorState;
  }

  const { message } = error.response.data;

  if (typeof message !== 'object') {
    return emptyErrorState;
  }

  return { ...emptyErrorState, ...message };
}
