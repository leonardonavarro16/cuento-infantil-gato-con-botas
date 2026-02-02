import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "El Gato con Botas - Cuento Interactivo para Niños",
  description:
    "Descubre la magica historia del Gato con Botas en este cuento animado e interactivo. Perfecto para niños a partir de 1 año. Animaciones, sonidos y mucha diversion.",
  keywords: [
    "cuento infantil",
    "gato con botas",
    "cuento interactivo",
    "niños",
    "animacion",
    "historia para niños",
  ],
  authors: [{ name: "Leonardo Navarro" }],
  openGraph: {
    title: "El Gato con Botas - Cuento Interactivo",
    description: "Un cuento animado e interactivo para los mas pequeños",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${nunito.variable} ${fredoka.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
