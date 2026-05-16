import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import Navbar from "../components/Navbar";
import CinematicBackground from "../components/CinematicBackground";
import { ThemeProvider } from "../components/ThemeProvider";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AERION X1 | The Future Takes Flight",
  description: "Experience the ultimate in cinematic luxury aerospace engineering with the AERION X1 private jet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${manrope.variable} antialiased`}
    >
      <body className="min-h-screen bg-transparent text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-white transition-colors duration-1000">
        <ThemeProvider>
          <CinematicBackground />
          <SmoothScroll>
            <Navbar />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
