import UserProvider from "@/components/userProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./Footer";
import "./globals.css";
import Header from "./Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APK Upload Panel Demo",
  description: "APK Upload Panel Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} mx-auto flex min-h-screen w-full max-w-screen-lg flex-col antialiased`}
      >
        <UserProvider>
          <Header />
          {children}
          <Footer className="mt-auto mb-0" />
        </UserProvider>
      </body>
    </html>
  );
}
