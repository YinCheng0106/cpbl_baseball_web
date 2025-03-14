import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "中職賽事",
  description: "在這裡可以取得中職賽事、球隊以及球員的資訊",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zt-TW">
      <body>{children}</body>
    </html>
  );
}
