import { useState } from 'react';
import type { ReactElement, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { isNil } from 'ramda';

import { extractValidationError } from '@Utils/functions';
import { useSignIn } from '@Store/auth';
import { ROUTER_PATH } from '@Router/constant';
import { AuthHeader } from '@Components/Auth';
import { BaseInput, GradientButton } from '@Components/Shared';

import { validateInputs } from './validation';
import { SIGN_IN_FIELDS } from './data';
import styles from './SignInForm.module.css';


export type SignInData = {
  email: string;
  password: string;
};

const initialState = {
  email: '',
  password: '',
};

export function SignInForm(): ReactElement {
  const { error, signInMutation, isPending } = useSignIn();
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors((state) => ({ ...state, [e.target.name]: '' }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validateInputs(values);

    if (isNil(validationErrors)) {
      signInMutation(values);
    } else {
      setErrors(validationErrors);
    }
  };

  const validationErrors = extractValidationError<SignInData>(
    initialState,
    error
  );

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <AuthHeader headre='Sign In' text='Login Into Your Account' />
      <div className={styles.inputs}>
        {SIGN_IN_FIELDS.map((input) => (
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
        Sign In
      </GradientButton>

      <div className={styles.links}>
        <Link to={ROUTER_PATH.SIGN_UP}>Sign Up</Link>
        <span>|</span>
        <Link to={ROUTER_PATH.RECOVERY}>Recovery</Link>
      </div>
    </form>
  );
}
