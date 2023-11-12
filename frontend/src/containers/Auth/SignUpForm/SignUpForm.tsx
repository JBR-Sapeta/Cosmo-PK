import { useState } from 'react';
import type { ReactElement, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useSignUp } from '@Store/auth';
import { ROUTER_PATH } from '@Router/constant';
import { AuthHeader } from '@Components/Auth';
import { BaseInput, GradientButton } from '@Components/Shared';
import styles from './SignUpFrom.module.css';
import { SIGN_UP_FIELDS } from './data';

export type SignUpFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUpForm(): ReactElement {
  const { signUpMutation, isPending } = useSignUp();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    signUpMutation(values);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <AuthHeader headre='Sign Up' text='Create Your Account' />
      <div className={styles.inputs}>
        {SIGN_UP_FIELDS.map((input) => (
          <BaseInput key={input.id} {...input} onChange={onChange} error={''} />
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
