import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";

import Appbar from "@/components/appbar/Appbar";
import Providers from "@/components/providers/Providers";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "IvPrep",
  description: "Prepare for your interview with confidence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${roboto.className} grid grid-rows-[50px_1fr] h-dvh w-screen pd-2`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Appbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
