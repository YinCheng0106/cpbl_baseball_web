import { Manrope, Noto_Sans_TC } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { AppHeader } from "@/components/app/header";
import { AppFooter } from "@/components/app/footer";
import { ThemeProvider } from "@/components/provider/theme-provider";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

const noto = Noto_Sans_TC({
  preload: false,
  display: "swap",
});

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
    <html lang="zt-TW" suppressHydrationWarning>
      <body
        className={`
          ${noto.className}
          ${manrope.className}
          antialiased
        `}
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col">
            <div className="min-h-svh flex flex-col px-4 items-center">
              <AppHeader />
              {children}
            </div>
            <AppFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
