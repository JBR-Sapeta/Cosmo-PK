import { type ReactElement, PropsWithChildren } from 'react';
import styles from './BaseContentLayout.module.css';

export function BaseContentLayout({
  children,
}: PropsWithChildren): ReactElement {
  return <div className={styles.wrapper}>{children}</div>;
}
