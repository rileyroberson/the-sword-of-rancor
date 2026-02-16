import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Sword of Rancor",
  description: "A choose-your-own-adventure game. Return the cursed blade before it consumes you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="scanlines">
        {children}
      </body>
    </html>
  );
}
