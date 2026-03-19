import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "hi im xige",
  description: "my personal website",
  keywords: [
    "xige",
    "xigechen",
    "xige chen",
    "xige chen roblox",
    "xige chen software engineer",
    "michael chen",
    "michael chen roblox",
    "michael chen software engineer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mxchen.app",
    title: "hi im xige",
    description: "my personal website",
    images: [
      {
        url: "https://raw.githubusercontent.com/mxchen2001/mind-palace/master/Assets/xigechen.png",
        width: 1458,
        height: 712,
        alt: "hi im xige",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
