import { useState } from 'react';
import type { ReactElement, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { isNil } from 'ramda';

import { extractValidationError } from '@Utils/functions';
import { ROUTER_PATH } from '@Router/constant';
import { useSignUp } from '@Store/auth';
import { AuthHeader } from '@Components/Auth';
import { BaseInput, GradientButton } from '@Components/Shared';

import { validateInputs } from './validation';
import { SIGN_UP_FIELDS } from './data';
import styles from './SignUpFrom.module.css';

export type SignUpData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export function SignUpForm(): ReactElement {
  const { signUpMutation, isPending, error } = useSignUp();
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    setErrors((state) => ({ ...state, [e.target.name]: '' }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validateInputs(values);

    if (isNil(validationErrors)) {
      signUpMutation(values);
    } else {
      setErrors(validationErrors);
    }
  };

  const validationErrors = extractValidationError<SignUpData>(
    initialState,
    error
  );

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <AuthHeader headre='Sign Up' text='Create Your Account' />
      <div className={styles.inputs}>
        {SIGN_UP_FIELDS.map((input) => (
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
        Sign Up
      </GradientButton>

      <div className={styles.links}>
        <Link to={ROUTER_PATH.SIGN_IN}>Sign In</Link>
        <span>|</span>
        <Link to={ROUTER_PATH.RECOVERY}>Recovery</Link>
      </div>
    </form>
  );
}
