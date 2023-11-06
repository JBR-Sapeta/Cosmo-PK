import { type ReactElement, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { VscMenu, VscChromeClose } from 'react-icons/vsc';
import styles from './Header.module.css';
import cosmo from '@Assets/svg/cosmo.svg';

import { NAV_DATA } from './data';
import clsx from 'clsx';

export default function Header(): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to='/'>
          <img className={styles.logo} src={cosmo} alt='Cosmo PK logo' />
        </Link>
        <nav className={styles.nav}>
          <ul>
            {NAV_DATA.map(({ label, path }) => (
              <li key={label}>
                <NavLink
                  className={({ isActive }) =>
                    clsx(styles.link, { [styles.active]: isActive })
                  }
                  to={path}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setIsMenuOpen((state) => !state)}
            arial-label='Menu button'
          >
            {isMenuOpen ? (
              <VscChromeClose arial-label='Close menu' />
            ) : (
              <VscMenu arial-label='Open menu' />
            )}
          </button>
        </nav>
      </div>
      <div className={styles.border} />
    </header>
  );
}
