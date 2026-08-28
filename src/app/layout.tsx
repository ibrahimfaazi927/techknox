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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://techknox.dev'),
  title: {
    default: 'TechKnox — We build the technology your business needs',
    template: '%s · TechKnox'
  },
  description:
    'TechKnox engineers custom web applications, AI automation, API integrations, software systems, and internal business tools tailored to your operational requirements.',
  keywords: [
    'TechKnox',
    'custom web application development',
    'AI automation agency',
    'API integration services',
    'custom business software',
    'business dashboards',
    'workflow automation',
    'CRM development'
  ],
  authors: [{ name: 'TechKnox' }],
  creator: 'TechKnox',
  openGraph: {
    title: 'TechKnox — We build the technology your business needs',
    description:
      'Custom websites, web applications, API integrations, AI systems, and business automation built around your problem.',
    type: 'website',
    url: 'https://techknox.dev',
    siteName: 'TechKnox'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechKnox — Custom Technology Solutions',
    description: 'We build the technology your business needs.'
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
      className={`dark ${body.variable} ${display.variable}`}
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
