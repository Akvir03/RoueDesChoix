// components/Header.tsx

import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
      {/* Add any other header content or styles here */}
    </header>
  );
};

export default Header;
