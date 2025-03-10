import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "../../globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Login | Amrit Kosh",
  description: "Amrit kosh milk bank",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Toaster position="top-right" />
        {children}
        </body>
    </html>
  );
}
