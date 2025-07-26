import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { AppSidebar } from "@/components/Sidebar";
import { cookies } from "next/headers";

import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const debata = localFont({
  variable: "--font-debata",
  src: [
    {
      path: "../utils/fonts/Debata-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../utils/fonts/Debata-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../utils/fonts/Debata-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../utils/fonts/Debata-Italic.otf",
      weight: "400",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "NeuraOne",
  description: "Admin dashboard for NeuraOne",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${debata.variable} antialiased`}
      >
        <Providers defaultOpen={defaultOpen}>
          <AppSidebar />
          <main className="mt-24 w-full overflow-x-hidden md:mt-16 xl:mt-20">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
