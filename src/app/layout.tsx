import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Craviston | Waffles & Sandwiches',
  description: 'Cloud Kitchen delivering bold waffles and stacked sandwiches. Order fresh on Zomato.',
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
