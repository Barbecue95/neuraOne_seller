"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { SidebarProvider } from "@/components/ui/sidebar";

export function Providers({
  children,
  defaultOpen,
}: {
  children: ReactNode;
  defaultOpen: boolean;
}) {
  return (
    <Provider store={store}>
      <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>
    </Provider>
  );
}
