"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Create a client
const queryClient = new QueryClient();

export function Providers({
  children,
  defaultOpen,
}: {
  children: ReactNode;
  defaultOpen: boolean;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>
      </Provider>
    </QueryClientProvider>
  );
}
