import { type ReactElement, PropsWithChildren } from 'react';
import styles from './Main.module.css';

type MainProps = PropsWithChildren<unknown>;

export default function Main({ children }: MainProps): ReactElement {
  return <main className={styles.main}>{children}</main>;
}
