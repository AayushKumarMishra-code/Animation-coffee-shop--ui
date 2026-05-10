import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "COCO Coffee — Premium Iced Coffee Experience",
  description:
    "Sip the dark side. Where espresso meets ice in a slow, seductive pour. COCO Coffee — cold-brewed obsession.",
  keywords: ["iced coffee", "luxury coffee", "cold brew", "premium beverage", "coco coffee"],
  openGraph: {
    title: "COCO Coffee — Premium Iced Coffee Experience",
    description: "Sip the dark side. Cold-brewed obsession, delivered to your door.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
