import type { Metadata } from 'next';
import { Poppins, Montserrat } from 'next/font/google';
import './globals.css';
import { GSAPProvider } from '@/components/providers/GSAPProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Social Route | Your Route to Digital Growth',
  description:
    'Full-service digital marketing agency helping brands build strong online presence through storytelling, creative content, and result-driven strategies.',
  openGraph: {
    title: 'Social Route | Your Route to Digital Growth',
    description:
      'We help brands grow online through powerful storytelling, creative content, and result-driven digital marketing strategies.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans min-h-screen">
        <GSAPProvider>
          <div className="noise-overlay" />
          <CustomCursor />
          {children}
        </GSAPProvider>
      </body>
    </html>
  );
}
