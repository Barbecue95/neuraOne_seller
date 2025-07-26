"use client";

import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
// Create a client
const queryClient = new QueryClient();

export function Providers({
  children,
  defaultOpen,
}: {
  children: ReactNode;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar open={open} setOpen={setOpen} />
          <SidebarProvider
            defaultOpen={defaultOpen}
            open={open}
            onOpenChange={setOpen}
          >
            {children}
          </SidebarProvider>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}
