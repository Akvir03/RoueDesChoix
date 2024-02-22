import Header from './header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <title>La Roue des Choix !</title>
      <Header/>
      <body>{children}</body>
    </html>
  )
}