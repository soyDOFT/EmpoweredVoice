import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from '../components/Nav'
import Footer from '../components/Footer'
import ChatPopup from "@/components/chat/ChatPopup";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Empowered Voice",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
        <ChatPopup />
      </body>
    </html>
  );
}
