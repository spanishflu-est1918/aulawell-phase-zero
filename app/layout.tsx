import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aulawell English - Expert English Tutoring | Private & Group Classes",
  description: "Professional English tutoring for Academic English (GCSE, A-Level, IB) and Language courses (IELTS, FCE). Private lessons and small group classes available.",
  keywords: "English tutoring, GCSE English, A-Level English, IB English, IELTS preparation, FCE, private English lessons, English classes",
  authors: [{ name: "Aulawell English" }],
  openGraph: {
    title: "Aulawell English - Expert English Tutoring",
    description: "Transform your English skills with expert tutoring",
    type: "website",
    url: "https://aulawell.co",
    siteName: "Aulawell English",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
