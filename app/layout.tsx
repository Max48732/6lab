import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lab 6 – Validation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        {children}
      </body>
    </html>
  );
}
