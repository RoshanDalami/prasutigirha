"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Amrit Kosh",
//   description: "",
// };

export default function RootLayout({ children }) {
  // const [isRehydrated, setIsRehydrated] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>Amrit Kosh</title>
      </head>

      <RecoilRoot>
        <body className={inter.className}>{children}</body>
      </RecoilRoot>
    </html>
  );
}
