import "./globals.css";
import {Toaster} from "react-hot-toast";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "GoldenBites",
  description: "Best food delivery service",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster/>
        <Header/>
        {children}
        </body>
    </html>
  );
}
