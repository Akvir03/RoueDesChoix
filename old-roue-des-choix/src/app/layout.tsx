// layout.tsx

import React from 'react';
import Header from './header';
import Footer from './footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <title>La Roue des Choix !</title>
      </head>
      <body>
      <Header />
        {children}
      <Footer />
      </body>
    </html>
  );
}
