import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body
        classalbumTitle={`${inter.classalbumTitle} bg-cupid-200 text-ebonyclay-950`}
      >
        {children}
      </body>
    </html>
  );
}
