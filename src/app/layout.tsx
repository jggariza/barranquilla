import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/lib/lenis-provider";
import Navigation from "@/components/navigation";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Barranquilla — La belleza escondida",
  description:
    "Una galería visual que celebra la arquitectura y belleza cotidiana de Barranquilla, capturada desde Street View.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${sora.variable} antialiased`}>
      <body className="bg-[#f5f2ed] font-sans text-neutral-900">
        <LenisProvider>
          <Navigation />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
