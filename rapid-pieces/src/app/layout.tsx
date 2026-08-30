import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#E63946",
};

export const metadata: Metadata = {
  title: "Rapid Pièces — Trouvez. Comparez. Commandez. Recevez.",
  description: "La bourse digitale des pièces automobiles. Trouvez la pièce qu'il vous faut au meilleur prix, au bon endroit.",
  icons: {
    icon: "/logo_rapidePiece.jpeg",
    apple: "/logo_rapidePiece.jpeg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="apple-touch-icon" href="/logo_rapidePiece.jpeg" />
      </head>
      <body className="min-h-screen bg-rp-bg">
        <AuthProvider>
          <div className="app-container">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
