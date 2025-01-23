"use client";
import { Inter } from "next/font/google";
import "../../globals.css";
import dynamic from 'next/dynamic'
import Footer from "src/components/footer";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
const inter = Inter({ subsets: ["latin"] });


const Navbar = dynamic(()=> import('../../../components/navbar'),{ssr:false})
const SideBar = dynamic(()=> import('../../../components/SideBar'),{ssr:false})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Amrit Kosh</title>
      </head>
      <RecoilRoot>
        <body className={`${inter.className} flex `}>
          <Navbar />
          <SideBar />
          <Toaster position="top-right" />
          <main className="md:ml-60 mb-10">
            {children}
            <div className="flex justify-center mt-10  ">
              <Footer />
            </div>
          </main>
        </body>
      </RecoilRoot>
    </html>
  );
}
