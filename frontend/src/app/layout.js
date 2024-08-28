import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from '../components/Nav'
import Footer from '../components/Footer'


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
      </body>
    </html>
  );
}
