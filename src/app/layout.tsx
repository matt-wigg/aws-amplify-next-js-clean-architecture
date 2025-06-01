import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ConfigureAmplifyClientSide } from "@/components/configure-amplify";
import "@aws-amplify/ui-react/styles.css";
import "./globals.css";

// Font configuration with CSS variable support
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

/**
 * Root layout component that wraps the entire app.
 */
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
