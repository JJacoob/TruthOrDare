import { type ReactNode } from "react";
import type { Metadata } from "next";
import { BBH_Bogle, Lato, Poppins } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "./provider";

const bbtFont = BBH_Bogle({
  variable: "--font-bbh",
  weight: ["400"],
  fallback: ["sans-serif"],
  subsets: ["latin"]
});

const latoFont = Lato({
  variable: "--font-lato",
  weight: ["100", "300", "400", "700"],
  fallback: ["sans-serif"],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Truth or Dare",
  description: "A simple game for all!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html data-theme="party-light" className={`${latoFont.variable} ${bbtFont.variable}`}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
