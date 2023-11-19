import { useState } from 'react';
import type { ReactElement, ChangeEvent, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isNil } from 'ramda';

import { extractValidationError } from '@Utils/extractValidationError';
import { ROUTER_PARAMS } from '@Router/constant';
import { useResetPassword } from '@Store/auth/useResetPassword';
import { AuthHeader } from '@Components/Auth';
import { BaseInput, GradientButton } from '@Components/Shared';

import { validateInputs } from './utils';
import { RESET_PASSWORD_FIELDS } from './data';
import styles from './ResetPasswordForm.module.css';

export type ResetPasswordData = {
  password: string;
  confirmPassword: string;
};

const initialState = {
  password: '',
  confirmPassword: '',
};

export function ResetPasswordForm(): ReactElement {
  const [searchParams] = useSearchParams();
  const { error, isPending, resetPasswordMutation } = useResetPassword();
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const resetToken = searchParams.get(ROUTER_PARAMS.RESET);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    setErrors((state) => ({ ...state, [e.target.name]: '' }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validateInputs(values);

    if (isNil(validationErrors)) {
      resetToken &&
        resetPasswordMutation({ password: values.password, resetToken });
    } else {
      setErrors(validationErrors);
    }
  };

  const validationErrors = extractValidationError<ResetPasswordData>(
    initialState,
    error
  );

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <AuthHeader headre='New Password' text='Set Your New Password' />
      <div className={styles.inputs}>
        {RESET_PASSWORD_FIELDS.map((input) => (
          <BaseInput
            key={input.id}
            {...input}
            onChange={onChange}
            value={values[input.name]}
            error={errors[input.name] || validationErrors[input.name]}
          />
        ))}
      </div>

      <GradientButton size='small' type='submit' disabled={isPending}>
        Reset
      </GradientButton>
    </form>
  );
}
