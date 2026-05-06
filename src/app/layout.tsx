import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Strata | Buildings that don't feel earthquakes",
  description:
    "Metamaterial foundations that redirect seismic waves around structures. The first technology that doesn't fight earthquakes: it routes them away.",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-[100dvh] flex flex-col font-sans">{children}</body>
    </html>
  );
}
