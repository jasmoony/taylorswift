import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const titleFont = localFont({
  src: "../public/pistilliroman.otf",
  display: "swap",
  variable: "--font-title",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Surprise Song Generator",
  description: "Created by Jasmine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${titleFont.variable} ${bodyFont.variable} font-body bg-cupid-200 text-ebonyclay-950`}
      >
        {children}
      </body>
    </html>
  );
}
