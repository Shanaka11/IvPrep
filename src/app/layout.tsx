import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";

import Appbar from "@/components/appbar/Appbar";
import Providers from "@/components/providers/Providers";

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
        <body className={`${roboto.className} grid grid-rows-[50px_1fr]`}>
          <Appbar />
          {children}
        </body>
      </html>
    </Providers>
  );
}
