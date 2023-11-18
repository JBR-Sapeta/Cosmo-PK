import { AxiosError } from 'axios';
import { ErrorMessage, Nullable, Nullish } from './types';
import { isNil } from 'ramda';

/**
 * Extracts error response data from Axios error object.
 * @param {AxiosError<ErrorMessage>} error Axios Error object.
 * @returns {Nullable<ErrorMessage>} error object or null.
 */
export function extractError(
  error: Nullish<AxiosError<ErrorMessage>>
): Nullable<ErrorMessage> {
  if (isNil(error) || isNil(error.response) || isNil(error.response.data)) {
    return null;
  }
  const { data } = error.response;

  return data;
}
