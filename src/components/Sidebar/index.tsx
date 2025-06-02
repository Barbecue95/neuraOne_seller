"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  BadgePercent,
  ChartNoAxesColumn,
  ChevronDown,
  ReceiptText,
  Store,
  UsersRound,
  Package,
  LayoutDashboard,
} from "lucide-react";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

//types
import { SiteMapGroup, SiteMapItem } from "@/types/sidebar.types";
import IconNetwork from "@/utils/icons/IconNetwork";

// exported for Navbar component
export const siteMap: SiteMapGroup[] = [
  {
    id: 1,
    name: "overview",
    items: [
      { id: 1, name: "Dashboard", icon: <LayoutDashboard />, path: "/" },
      {
        id: 2,
        name: "Product Management",
        path: "/products",
        icon: <Package />,
        subPath: [
          {
            id: 1,
            name: "Products List",
            icon: <Package />,
            path: "/products",
          },
          {
            id: 2,
            name: "Product Category List",
            icon: <Package />,
            path: "/products/category",
          },
          {
            id: 3,
            name: "brand List",
            icon: <Package />,
            path: "/products/brand",
          },
        ],
      },
      {
        id: 3,
        name: "Order Management",
        icon: <ReceiptText />,
        path: "/orders",
      },
      {
        id: 4,
        name: "Customer Management",
        icon: <UsersRound />,
        path: "/customers",
      },
      {
        id: 5,
        name: "Analytics & Reports",
        icon: <ChartNoAxesColumn />,
        path: "/reports",
      },
      {
        id: 6,
        name: "Campaign & Flash Sales",
        icon: <BadgePercent />,
        path: "/campaign",
      },
    ],
  },
  {
    id: 2,
    name: "Finance",
    items: [
      {
        id: 1,
        name: "Payment & Transaction",
        path: "/payments",
        icon: <Package />,
      },

      {
        id: 2,
        name: "Shipping & Delivery",
        path: "/delivery",
        icon: <Package />,
      },
    ],
  },
  {
    id: 3,
    name: "System",
    items: [
      {
        id: 1,
        name: "User role & Authentication",
        icon: <Store />,
        path: "/roles",
      },

      {
        id: 2,
        name: "Notification",
        icon: <ReceiptText />,
        path: "/notification",
      },
      { id: 3, name: "settings", icon: <UsersRound />, path: "/settings" },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state, setOpen } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      side="left"
      variant="sidebar"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <SidebarHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="neuraOne" />
            <AvatarFallback>NO</AvatarFallback>
          </Avatar>
          <h1
            className={cn([
              "font-brand flex cursor-default flex-nowrap items-center text-2xl font-extralight",
              {
                hidden: state === "collapsed",
              },
            ])}
          >
            <span className="text-primary">Neura</span>
            <span className="text-accent-foreground flex flex-nowrap items-center">
              <IconNetwork className="size-7" />
              ne
            </span>
          </h1>
        </div>
        {/* <SidebarTrigger /> */}
      </SidebarHeader>
      <SidebarContent>
        {siteMap.map((group) => (
          <SidebarGroup key={group.id}>
            <SidebarGroupLabel>{group.name}</SidebarGroupLabel>
            <SidebarGroupContent>
              {group.items.map((item) => (
                <SidebarItemRender
                  item={item}
                  key={item.id}
                  pathname={pathname}
                  state={state}
                />
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

function SidebarItemRender({
  item,
  pathname,
  state,
}: {
  item: SiteMapItem;
  pathname: string;
  state: "collapsed" | "expanded";
}) {
  const withSubItem = (
    <Collapsible className="group/collapsible" key={item.id}>
      <SidebarMenuItem className="list-none">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="">
            {item.icon}
            <span className="text-nowrap">{item.name}</span>
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.subPath?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.id}>
                <SidebarMenuSubButton
                  asChild
                  isActive={pathname === subItem.path}
                >
                  <a href={subItem.path}>
                    {subItem.icon}
                    <span>{subItem.name}</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );

  const withoutSubItem = (
    <SidebarMenu className="mb-0.5">
      <SidebarMenuItem key={item.id}>
        <SidebarMenuButton asChild isActive={pathname === item.path}>
          <a href={item.path}>
            {item.icon}
            <span className="text-nowrap">{item.name}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
  return item.subPath ? withSubItem : withoutSubItem;
}
