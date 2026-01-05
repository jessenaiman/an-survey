import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getAllContent } from "@/lib/markdown";
import { ThemeProvider } from "@/components/theme-provider"

const fontHeading = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "A.N. Survey Instrument | Sales, Service & Repair",
  description: "Sales and Service of Surveying Instruments, equipment and supplies. Since 1992.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allContent = await getAllContent();
  const searchItems = allContent.map((item: any) => ({
    slug: item.slug,
    title: item.title,
    brand: item.brand,
    type: item.type,
    ...item
  }));

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          fontHeading.variable,
          fontBody.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar searchItems={searchItems} />
            <main className="flex-1 w-full max-w-7xl mx-auto">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
