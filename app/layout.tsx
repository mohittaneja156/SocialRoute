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
  metadataBase: new URL('https://socialroute.com'), // Replace with actual domain
  title: {
    default: 'Social Route | Premium Digital Marketing Agency',
    template: '%s | Social Route',
  },
  description:
    'Elevate your brand with Social Route. We provide full-service digital marketing, SEO, social media management, and creative content strategies to drive growth.',
  keywords: [
    'Digital Marketing Agency',
    'Social Media Marketing',
    'SEO Services',
    'Content Creation',
    'Brand Strategy',
    'Social Route',
    'Marketing Agency Delhi',
    'Online Growth',
  ],
  authors: [{ name: 'Social Route Team' }],
  creator: 'Social Route',
  publisher: 'Social Route',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Social Route | Your Route to Digital Growth',
    description:
      'We help brands grow online through powerful storytelling, creative content, and result-driven digital marketing strategies.',
    url: 'https://socialroute.com',
    siteName: 'Social Route',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // Ensure this image exists in public folder
        width: 1200,
        height: 630,
        alt: 'Social Route Digital Marketing Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Route | Premium Digital Marketing Agency',
    description:
      'Elevate your brand with Social Route. Full-service digital marketing, SEO, and creative content strategies.',
    creator: '@socialroute', // Replace with valid handle if available
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
