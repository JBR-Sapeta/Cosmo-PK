import { type ReactElement } from 'react';
import styles from './Footer.module.css';

import { NAV_DATA, MEDIA_DATA } from './data';
import { Link } from 'react-router-dom';

export default function Footer(): ReactElement {
  return (
    <footer className={styles.footer}>
      <div className={styles.border} />
      <div className={styles.container}>
        <ul className={styles.localLinks}>
          {NAV_DATA.map(({ label, path }) => (
            <li key={label}>
              <Link className={styles.localLink} to={path}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <ul>
          {MEDIA_DATA.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                className={styles.link}
                href={href}
                target='_blank'
                rel='noreferrer'
              >
                <Icon />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.rights}> © 2023 - Made by Cosmo PK Group </p>
    </footer>
  );
}
