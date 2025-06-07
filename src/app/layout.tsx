import { ThemeProvider } from "@nextjs/components/theme/theme-provider";
import { ConfigureAmplifyClientSide } from "@nextjs/components/layout/configure-amplify";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "@aws-amplify/ui-react/styles.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AWS Amplify Next.js App",
  description: "A boilerplate Next.js app with Amplify.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ThemeProvider>
          <ConfigureAmplifyClientSide />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
