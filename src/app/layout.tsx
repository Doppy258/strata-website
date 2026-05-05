import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Strata | Buildings that don't feel earthquakes",
  description: "Metamaterial foundations that redirect seismic waves around structures. The first technology that doesn't fight earthquakes — it makes them disappear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-[100dvh] flex flex-col font-sans">{children}</body>
    </html>
  );
}
