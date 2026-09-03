import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getCompanyProfile } from '@/lib/data';
import RevealObserver from '@/components/RevealObserver';
import Chatbot from '@/components/Chatbot';

// Revalidate the layout (and all pages it wraps) at most every hour.
// Admin CMS actions call revalidatePath to bust this cache immediately on edit.
export const revalidate = 3600;

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

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
      className={`${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white selection:bg-neutral-800 selection:text-white font-sans">
        <main className="relative min-h-screen bg-black selection:bg-zinc-800 selection:text-white overflow-hidden">
          <RevealObserver />
          <Navbar brandName={profile.brand_name} email={profile.email} />
          <div className="flex-1">{children}</div>
          <Footer profile={profile} />
          <Chatbot />
        </main>
      </body>
    </html>
  );
}
