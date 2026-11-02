import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";

import { personalInfo, siteConfig } from "@/data/personalInfo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const title = `${personalInfo.fullName} — ${personalInfo.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s | ${personalInfo.fullName}`,
  },
  description: siteConfig.description,
  applicationName: `${personalInfo.fullName} Portfolio`,
  authors: [{ name: personalInfo.fullName }],
  creator: personalInfo.fullName,
  keywords: [
    "Aditya Sumbre",
    "Full Stack Web Developer",
    "Programmer",
    "Computer Engineering Student",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "Portfolio",
    "Web Developer Portfolio",
    "Government Polytechnic Awasari Khurd",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: `${personalInfo.fullName} — Portfolio`,
    title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080403",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-void text-chalk">
        {/* Without JavaScript, scroll-reveal elements must stay visible. */}
        <noscript>
          <style>{`[data-reveal], [data-reveal] * { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
