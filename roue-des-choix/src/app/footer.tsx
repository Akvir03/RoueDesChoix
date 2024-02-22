// components/Footer.tsx

import React from 'react';
import styles from './styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} -8px All rights reserved.</p>
      <img src='./img/logo_trop_stylax.png' alt='coucou'/>
      {/* Add any other footer content or credits here */}
    </footer>
  );
};

export default Footer;
