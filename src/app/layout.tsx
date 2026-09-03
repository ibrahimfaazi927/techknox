import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { getCompanyProfile } from '@/lib/data';
import RevealObserver from '@/components/RevealObserver';
import Chatbot from '@/components/Chatbot';

// Revalidate the layout (and all pages it wraps) at most every hour.
// Admin CMS actions call revalidatePath to bust this cache immediately on edit.
export const revalidate = 3600;

const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
// IBM Plex Mono removed — system monospace fallback used via --font-mono CSS variable.

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://teknox.dev'),
  title: {
    default: 'Teknox — Modern Software, AI Automation & Digital Systems',
    template: '%s · Teknox'
  },
  description:
    'Teknox engineers high-performance web applications, AI automation pipelines, API integrations, and custom business systems for fast-growing companies.',
  keywords: [
    'Teknox',
    'custom software development',
    'startup web development',
    'AI automation studio',
    'API integration services',
    'custom business software',
    'SaaS application development',
    'workflow automation'
  ],
  authors: [{ name: 'Teknox' }],
  creator: 'Teknox',
  openGraph: {
    title: 'Teknox — Modern Software, AI Automation & Digital Systems',
    description:
      'High-performance web applications, API integrations, AI systems, and business automation built for modern companies.',
    type: 'website',
    url: 'https://teknox.dev',
    siteName: 'Teknox'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teknox — Modern Software & AI Solutions',
    description: 'Engineering intelligent software and digital systems for fast-growing companies.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCompanyProfile();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${body.variable} ${display.variable}`}
    >
      <body className="font-body antialiased bg-ink text-star min-h-screen flex flex-col selection:bg-signal selection:text-white">
        <ThemeProvider>
          <RevealObserver />
          <Navbar brandName={profile.brand_name} email={profile.email} />
          <main className="flex-1">{children}</main>
          <Footer profile={profile} />
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
