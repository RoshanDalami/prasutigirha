"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { RecoilRoot } from "recoil";
import QueryProvider from "src/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Amrit Kosh</title>
      </head>

      <QueryProvider>
        <RecoilRoot>
          <body className={inter.className}>{children}</body>
        </RecoilRoot>
      </QueryProvider>
    </html>
  );
}
