import type { Metadata } from "next";
import "./globals.css";
import Nav from "./_component/nav/Nav";
import { ReactNode } from "react";
import { NextAuthSession } from "./_component/auth/NextAuthSession";
import RQProvider from "./_component/provider/RQProvider";

export const metadata: Metadata = {
  title: "D POST",
  description: "Generated Post by Dpost",
  icons: {
    icon: "/favicon.png",
  },
};

type Props = { children: ReactNode; modal: ReactNode };

export default function RootLayout({ children, modal }: Props) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/tui-color-picker@2.2.6/dist/tui-color-picker.min.css"
        ></link>
      </head>
      <body>
        <NextAuthSession>
          <RQProvider>
            <Nav />
            <main id="main">
              <div className="container">{children}</div>
              {modal}
            </main>
          </RQProvider>
        </NextAuthSession>
      </body>
    </html>
  );
}
