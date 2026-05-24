import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "User Analytics Dashboard",
  description: "Internal analytics dashboard for user management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Sidebar />
        <main className="ml-60 p-8">{children}</main>
      </body>
    </html>
  );
}
