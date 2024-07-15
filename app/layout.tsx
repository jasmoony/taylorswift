import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const myFont = localFont({
  src: "../public/pistilliroman.otf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Suprise Song Generator",
  description: "Created by Jasmine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${myFont.className} bg-cupid-200 text-ebonyclay-950`}>
        {children}
      </body>
    </html>
  );
}
