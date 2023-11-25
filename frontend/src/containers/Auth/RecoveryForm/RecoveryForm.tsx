import { useState } from 'react';
import type { ReactElement, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { extractError } from '@Utils/functions';
import { ROUTER_PATH } from '@Router/constant';
import { useRecovery } from '@Store/auth';
import { AuthHeader } from '@Components/Auth';
import { BaseInput, GradientButton } from '@Components/Shared';

import styles from './RecoveryForm.module.css';
import clsx from 'clsx';
import { isEmpty } from 'ramda';

export function RecoveryForm(): ReactElement {
  const { data, error, isPending, recoveryMutation } = useRecovery();
  const [value, setValue] = useState({ email: '' });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ email: e.target.value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isEmpty(value.email)) {
      recoveryMutation(value);
    }
  };

  const errorData = extractError(error);

  const messageClassNames = clsx(styles.message, {
    [styles.errorMessage]: error,
    [styles.succesMessage]: data,
  });

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <AuthHeader headre='Recovery' text='Reset Your Password' />
      <div className={styles.inputs}>
        <BaseInput
          name='email'
          type='email'
          placeholder='Email'
          onChange={onChange}
          value={value.email}
          required
        />
        <p className={styles.info}>
          Please enter your email address so we can send you an email to reset
          your password.
        </p>

        <p className={messageClassNames}>
          {data?.message}
          {errorData?.message}
        </p>
      </div>

      <GradientButton size='small' type='submit' disabled={isPending}>
        Reset
      </GradientButton>

      <div className={styles.links}>
        <Link to={ROUTER_PATH.SIGN_UP}>Sign Up</Link>
        <span>|</span>
        <Link to={ROUTER_PATH.SIGN_IN}>Sign In</Link>
      </div>
    </form>
  );
}
