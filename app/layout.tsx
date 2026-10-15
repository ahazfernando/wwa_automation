import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Footer, Header } from "@/components/site-shell";
import "@/styles.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Clyra | Strategy. Technology. People.",
    template: "%s",
  },
  description: "Business strategy, automation, digital marketing and staffing, connected by Clyra.",
  openGraph: {
    title: "Clyra | Strategy. Technology. People.",
    description: "A connected approach to better business.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
