import { Outfit } from "next/font/google";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"]
});

export const metadata = {
  title: "Apoorv Cab Booking",
  description: "Books cabs instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
