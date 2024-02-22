// components/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Random Group. All rights reserved.</p>
      {/* Add any other footer content or credits here */}
    </footer>
  );
};

export default Footer;
