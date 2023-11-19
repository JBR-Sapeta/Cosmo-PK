import { useState } from 'react';
import type { ReactElement, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { omit } from 'ramda';

import { useSignIn } from '@Store/auth';
import { ROUTER_PATH } from '@Router/constant';
import { AuthHeader } from '@Components/Auth';
import { BaseInput, GradientButton } from '@Components/Shared';

import { SIGN_IN_FIELDS } from './data';
import styles from './SignInForm.module.css';

export function SignInForm(): ReactElement {
  const { signInMutation, isPending } = useSignIn();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    signInMutation(omit(['confirmPassword'], values));
  };

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
