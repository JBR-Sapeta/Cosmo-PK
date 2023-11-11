import { type ReactElement, PropsWithChildren } from 'react';
import styles from './CenteredContentLayout.module.css';

export function CenteredContentLayout({
  children,
}: PropsWithChildren): ReactElement {
  return <div className={styles.wrapper}>{children}</div>;
}
