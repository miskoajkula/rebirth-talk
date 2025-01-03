import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ApolloWrapper } from "@/lib/network/apollo-wrapper";

import "./globals.css";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "@/constants";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Rebirth Tak",
  description: "A supportive platform for mindfulness, confessions, and recovery.",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <GoogleOAuthProvider
      clientId={GOOGLE_CLIENT_ID}>
      <ApolloWrapper>
        {children}
      </ApolloWrapper>
      <Toaster/>
    </GoogleOAuthProvider>
    </body>
    </html>
  );
}
