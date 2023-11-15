import { type ReactElement } from 'react';
import styles from './AuthHeader.module.css';
import clsx from 'clsx';

import logo from '@Assets/svg/logo-solid-gradient-l.svg';

type Props = {
  headre: string;
  text: string;
  className?: string;
};

export function AuthHeader({ headre, text, className }: Props): ReactElement {
  return (
    <div className={clsx(styles.container, className)}>
      <img src={logo} alt='Cosmo PK logo.' />
      <h2>{headre}</h2>
      <hr />
      <p>{text}</p>
    </div>
  );
}
