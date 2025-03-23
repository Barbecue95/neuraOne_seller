import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./query-provider";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppNavbar from "@/components/navbar/AppNavbar";

export const metadata: Metadata = {
  title: "JU Admin",
  description: "JU Admin Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-PublicSans">
        <QueryProvider>
          <SidebarProvider>
            <main className="h-screen w-screen grid grid-cols-12">
              <div className="col-span-2">
                <AppSidebar />
              </div>
              <section className="col-span-10 flex flex-col w-full bg-[#F1F1F1]">
                <div className="sticky top-0 left-0 z-[100]"><AppNavbar /></div>
                <div className="">{children}</div>
              </section>
            </main>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
