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
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
      {/* Add any other header content or styles here */}
    </header>
  );
};

export default Header;
