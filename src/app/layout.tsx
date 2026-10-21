import type {Metadata} from 'next';
import './globals.css';

const SITE_URL = 'https://craviston.in';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Craviston | Waffles & Sandwiches',
  description: 'Cloud Kitchen delivering bold waffles and stacked sandwiches. Order fresh on Zomato.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Craviston',
    title: 'Craviston | Waffles & Sandwiches',
    description: 'Hot waffles. Stacked sandwiches. Made fresh, delivered fast — on Zomato & Swiggy.',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'Craviston',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Craviston | Waffles & Sandwiches',
    description: 'Hot waffles. Stacked sandwiches. Made fresh, delivered fast — on Zomato & Swiggy.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;600;700;800&family=Pacifico&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
