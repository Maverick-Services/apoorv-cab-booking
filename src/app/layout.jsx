// import { OpenSans } from "next/font/google";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./globals.css";
import AuthProvider from "@/components/main/AuthProvider";
import { Toaster } from "react-hot-toast";
import Script from 'next/script';

export const metadata = {
  title: "Taps Cabs",
  description: "Go anywhere, effortlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-open-sans antialiased">
        <AuthProvider>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>

        <Script
          id="tawkto-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
              (function(){
                var s1 = document.createElement("script"),s0 = document.getElementsByTagName("script")[0];
                s1.async = true;
                s1.src = 'https://embed.tawk.to/5a2906d0d0795768aaf8ddfb/default';
                s1.charset = 'UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1, s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}