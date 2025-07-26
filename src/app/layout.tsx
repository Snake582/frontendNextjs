import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";


export const metadata: Metadata = {
  title: "Boutique",
  description: "A modern e-commerce platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
        <head>
        {/* Remix Icon */}
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />

        {/* Font Awesome */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main className="p-6">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
