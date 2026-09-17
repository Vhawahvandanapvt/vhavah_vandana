import { Outfit } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import AuthProvider from "@/components/AuthProvider";
import { LanguageProvider } from "@/lib/LanguageContext";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Vhavah Vandana — Sacred Spiritual Services in Varanasi",
    template: "%s | Vhavah Vandana",
  },
  description:
    "Book authentic spiritual experiences in Kashi/Varanasi. Ghat ceremonies, puja services, pandit booking, marriage celebrations, and puja samagri — all at your fingertips.",
  keywords: [
    "Kashi", "Varanasi", "puja booking", "ghat booking", "pandit ji",
    "spiritual services", "puja samagri", "marriage celebrations",
    "hindu rituals", "Ganga aarti", "Vhavah Vandana",
  ],
  openGraph: {
    title: "Vhavah Vandana — Sacred Spiritual Services in Varanasi",
    description:
      "Book authentic spiritual experiences in Kashi/Varanasi. Ghat ceremonies, puja services, pandit booking, and puja samagri.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider>
          <AuthProvider>
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
