import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import GlobalFooter from "@/components/GlobalFooter";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { STATIC_HOME, STATIC_SETTINGS } from "@/lib/static-data";

const headingFont = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Samuel abera",
  description: "Fullstack portfolio platform with modern product-grade interface",
  icons: {
    icon: "/fav.jpg",
    shortcut: "/fav.jpg",
    apple: "/fav.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutShell>{children}</RootLayoutShell>;
}

function RootLayoutShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <Navbar showBlog={STATIC_SETTINGS.showBlog} />
        <main className="w-full flex-1 px-0 pb-0 pt-16">
          {children}
        </main>
        <GlobalFooter initialProfile={STATIC_HOME.profile} />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
