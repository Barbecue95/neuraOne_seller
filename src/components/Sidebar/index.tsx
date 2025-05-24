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
import {
  BadgePercent,
  ChartNoAxesColumn,
  ChevronDown,
  ReceiptText,
  Store,
  UsersRound,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppSelector } from "@/store/hooks";
import { Package, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
const sidebarItemsGroup = [
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
        subPath: [],
      },

      {
        id: 2,
        name: "Shipping & Delivery",
        path: "/delivery",
        icon: <Package />,
        subPath: [],
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
  const user = useAppSelector((state) => state.user);
  const { state } = useSidebar();
  console.log("Sidebar state:", state);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center justify-between">
        <div
          className={cn("flex flex-row items-center gap-2", {
            hidden: state === "collapsed",
          })}
        >
          <Avatar className="size-14">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <h1 className="cursor-default text-2xl font-semibold">{user.name}</h1>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        {sidebarItemsGroup.map((group) => (
          <SidebarGroup key={group.id}>
            <SidebarGroupLabel>{group.name}</SidebarGroupLabel>

            <SidebarGroupContent>
              {group.items.map((item) => (
                <SidebarItemRender
                  item={item}
                  key={item.id}
                  pathname={pathname}
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
}: {
  item: {
    id: number;
    name: string;
    path: string;
    icon: React.ReactNode;
    subPath?: {
      id: number;
      name: string;
      path: string;
      icon: React.ReactNode;
    }[];
  };
  pathname: string;
}) {
  const withSubItem = (
    <SidebarMenuItem key={item.id}>
      <Collapsible className="group/collapsible">
        <SidebarGroup className="p-0 text-lg">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="peer/menu-button ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm !font-medium outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0">
              {item.icon}
              <span>{item.name}</span>
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
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
            <SidebarGroupContent />
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    </SidebarMenuItem>
  );

  const withoutSubItem = (
    <SidebarMenuItem key={item.id}>
      <SidebarMenuButton asChild isActive={pathname === item.path}>
        <a href={item.path}>
          {item.icon}
          <span>{item.name}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
  return (
    <SidebarMenu>{item.subPath ? withSubItem : withoutSubItem}</SidebarMenu>
  );
}
