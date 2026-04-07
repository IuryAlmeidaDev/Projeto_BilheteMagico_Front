import './globals.css';

export const metadata = {
  title: 'Bilhete Magico Pro',
  description: 'Dashboard de analise e geracao de jogos da Mega-Sena.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
