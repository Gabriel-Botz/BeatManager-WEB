import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/contexts/auth-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BeatManager - Gerenciamento de Eventos",
  description: "Sistema de gerenciamento de eventos de música eletrônica",
  icons: { icon: "/icon-bm.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <img
            src="/background-mb.png"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.35, transform: "translateX(24px)" }}
          />
        </div>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
