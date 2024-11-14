import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Section from "@/components/molecules/Section";
import Providers from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouApp",
  description: "YouApp Challenge",
  manifest: "/manifest.json",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-screen">
          <Providers>
            <Section className="h-full">{children}</Section>
          </Providers>
        </main>
      </body>
    </html>
  );
}
