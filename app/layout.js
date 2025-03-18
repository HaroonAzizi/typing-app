// app/layout.js - With theme support
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SpeedType - Improve Your Typing Speed",
  description: "A modern typing speed test application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
