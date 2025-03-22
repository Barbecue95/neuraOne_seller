"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Logo from "./Logo";
import IconDashboard from "./icons/IconDashboard";
import IconProduct from "./icons/IconProduct";
import IconOrder from "./icons/IconOrder";
import IconSetting from "./icons/IconSetting";
import IconHelp from "./icons/IconHelp";
import IconAnalytics from "./icons/IconAnalytics";

const navMain = [
  {
    title: "Dashboard",
    url: "#",
    icon: <IconDashboard className="" />,
    isActive: false,
  },
  {
    title: "Product",
    url: "#",
    icon: <IconProduct />,
    isActive: false,
    items: [
      {
        title: "Product List",
        url: "/products",
      },
      {
        title: "Inventory",
        url: "#",
      },
      {
        title: "Categories",
        url: "#",
      },
    ],
  },
  {
    title: "Order Management",
    url: "#",
    icon: <IconOrder />,
    isActive: false,
    items: [
      {
        title: "Order List",
        url: "#",
      },
    ],
  },
  {
    title: "Analytics",
    url: "#",
    icon: <IconAnalytics />,
    isActive: false,
  },
  {
    title: "Settings",
    url: "#",
    icon: <IconSetting />,
    isActive: false,
  },
  {
    title: "Help & Centre",
    url: "#",
    icon: <IconHelp />,
    isActive: false,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex justify-between items-center">
          <Logo />
          <SidebarTrigger className="" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
