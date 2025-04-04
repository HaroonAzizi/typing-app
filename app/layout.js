import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Typing Speed Test",
  description:
    "Test and improve your typing speed with this interactive typing test app",
  openGraph: {
    title: "Typing Speed Test",
    description:
      "Test and improve your typing speed with this interactive typing test app - Haroon Azizi",
    url: "https://type.haroonazizi.com", // Replace with your actual domain
    siteName: "Typing Speed Test",
    images: [
      {
        url: "/og-image.png", // Path to your image in the public folder
        width: 1200,
        height: 630,
        alt: "Typing Speed Test",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Typing Speed Test",
    description:
      "Test and improve your typing speed with this interactive typing test app - Haroon Azizi",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
