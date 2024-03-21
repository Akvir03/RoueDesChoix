// components/Header.tsx

import React from 'react';
import Link from 'next/link';
import styles from './styles/Navbar.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <Link href="/">Accueil</Link>
          </li>
          <li>
            <Link href="/connection">Connection</Link>
          </li>
          <li>
            <Link href="/mesroues">Mes Roues</Link>
          </li>
          <li>
            <Link href="/meilleursroues">Meilleurs roues</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
