import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Providers } from '../components/Providers';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0" />
      </head>
      <body>
        <div className="min-h-screen bg-[#f8f9fb] font-sans text-[#191c1e] selection:bg-[#bdc2ff] selection:text-[#0f144c] flex flex-col">
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}