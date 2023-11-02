import { type ReactElement, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './WidePageLayout.module.css';

type WidePageLayoutProps = {
  className?: string;
};

export function WidePageLayout({
  children,
  className,
}: PropsWithChildren<WidePageLayoutProps>): ReactElement {
  return (
    <div className={styles.container}>
      <div className={clsx(styles.content, className)}>{children}</div>
    </div>
  );
}
