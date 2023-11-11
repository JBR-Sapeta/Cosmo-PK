import { type ReactElement, type ChangeEvent, useState } from 'react';
import { AuthHeader } from '@Components/Auth';
import { BaseInput, GradientButton } from '@Components/Shared';
import styles from './SignUpFrom.module.css';

import { SIGN_UP_FIELDS } from './data';
import { Link } from 'react-router-dom';
import { ROUTES } from '@App/config';

export type SignUpFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUpForm(): ReactElement {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <form className={styles.form}>
      <AuthHeader headre='Sign Up' text='Create Your Account' />
      <div className={styles.inputs}>
        {SIGN_UP_FIELDS.map((input) => (
          <BaseInput key={input.id} {...input} onChange={onChange} error={''} />
        ))}
      </div>
      <GradientButton size='small' type='reset'>
        Sign Up
      </GradientButton>

      <div className={styles.links}>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        <span>|</span>
        <Link to={ROUTES.RECOVERY}>Recovery</Link>
      </div>
    </form>
  );
}
