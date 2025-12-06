import type { Metadata } from "next";
import { Outfit, Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

import { cn } from "@/lib/utils";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrustMe - Makan Enak Jadi Gampang",
  description: "Pesan makanan terbaik, cepat, dan murah dengan TrustMe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          outfit.variable,
          poppins.variable,
          spaceGrotesk.variable
        )}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1 transition-all duration-300">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

