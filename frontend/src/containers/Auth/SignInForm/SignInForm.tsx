import { type ReactElement, type ChangeEvent, useState } from 'react';
import { AuthHeader } from '@Components/Auth';
import { BaseInput, GradientButton } from '@Components/Shared';
import styles from './SignInForm.module.css';

import { SIGN_IN_FIELDS } from './data';
import { Link } from 'react-router-dom';
import { ROUTER_PATH } from '@Router/constant';

export type SignUpFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignInForm(): ReactElement {
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
      <AuthHeader headre='Sign In' text='Login Into Your Account' />
      <div className={styles.inputs}>
        {SIGN_IN_FIELDS.map((input) => (
          <BaseInput key={input.id} {...input} onChange={onChange} error={''} />
        ))}
      </div>
      <GradientButton size='small' type='reset'>
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
