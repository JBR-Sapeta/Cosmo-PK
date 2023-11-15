import { type ReactElement, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './BlankPageLayout.module.css';

type Props = PropsWithChildren<{
  className?: string;
}>;

export function BlankPageLayout({ children, className }: Props): ReactElement {
  return (
    <div className={styles.container}>
      <div className={clsx(styles.content, className)}>{children}</div>
    </div>
  );
}
