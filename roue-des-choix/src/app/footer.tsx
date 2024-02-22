// components/Footer.tsx

import React from 'react';
import styles from './styles/Footer.module.css';
import logo from  './img/logo_trop_stylax.png'
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} -8px All rights reserved.</p>
      <Image src={logo} alt={''} width={50} height={50} className={styles.couscousAuChocolat}/>
      {/* Add any other footer content or credits here */}
    </footer>
  );
};

export default Footer;
