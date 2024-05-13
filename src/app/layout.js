//import { Inter } from "next/font/google";
import Cart from "@/components/cart";
import "./globals.css";

//const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bazar al sol",
  description: "Tienda de productos Naturales",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*<body className={inter.className}>{children}</body>*/}
      <body>
        {children}
        </body>
    </html>
  );
}
