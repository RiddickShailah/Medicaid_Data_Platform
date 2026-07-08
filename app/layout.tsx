import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Centralized Medicaid Data Platform",
  description:
    "Regulatory dashboard for Value-Based Payment rate-setting across Managed Care Organizations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Header />
            <main className="flex-1 px-6 py-6 md:px-10 md:py-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
