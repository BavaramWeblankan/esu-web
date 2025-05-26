import type { Metadata } from "next";
import {
  Space_Grotesk,
  Nunito,
  Merriweather,
  Lobster,
  Orbitron,
  Felipa,
  Poppins,
  Manrope,
} from "next/font/google";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";
import Script from "next/script";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-merriweather",
});

const lobster = Lobster({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lobster",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-orbitron",
});

const felipa = Felipa({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-felipa",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title:
    "Education Institute in Sri Lanka | Sri Lanka Private University | ESOFT Uni",
  description:
    "At ESOFT Uni, we're committed to providing a transformative learning experience. With programs in ICT and other degree courses, our education institutes in Sri Lanka are widespread.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* GTM script for head */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KLC9HT5X');
          `}
        </Script>
        
      </head>
      <body
        className={`
          ${spaceGrotesk.variable}
          ${nunito.variable}
          ${merriweather.variable}
          ${lobster.variable}
          ${orbitron.variable}
          ${felipa.variable}
          ${poppins.variable}
          ${manrope.variable}
        `}
      >
        <RootLayoutClient>{children}</RootLayoutClient>

        {/* GTM noscript for body */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KLC9HT5X"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
