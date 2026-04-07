import './globals.css';

export const metadata = {
  title: 'Bilhete Mágico Pro',
  description: 'Dashboard de análise e geração de jogos da Mega-Sena.'
};

export const viewport = {
  themeColor: '#020503'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
