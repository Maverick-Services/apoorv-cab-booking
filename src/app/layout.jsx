// import { OpenSans } from "next/font/google";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./globals.css";
import AuthProvider from "@/components/main/AuthProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Apoorv Cab Booking",
  description: "Books cabs instantly.",
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
      </body>
    </html>
  );
}

