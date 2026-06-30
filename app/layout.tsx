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
