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
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppSelector } from "@/store/hooks";

const sidebarItemsGroup = [
  {
    id: 1,
    name: "overview",
    items: [
      { id: 1, name: "Dashboard", path: "/" },
      {
        id: 2,
        name: "Product Management",
        path: "/products",
        subPath: [
          { id: 1, name: "Products List", path: "/products" },
          { id: 2, name: "Product Category List", path: "/products/category" },
          { id: 3, name: "brand List", path: "/products/brand" },
        ],
      },
      { id: 3, name: "Order Management", path: "/orders" },
      { id: 4, name: "Customer Management", path: "/customers" },
      { id: 5, name: "Analytics & Reports", path: "/reports" },
      { id: 6, name: "Campaign & Flash Sales", path: "/campaign" },
    ],
  },
  {
    id: 2,
    name: "Finance",
    items: [
      { id: 1, name: "Payment & Transaction", path: "/payments", subPath: [] },

      { id: 2, name: "Shipping & Delivery", path: "/delivery", subPath: [] },
    ],
  },
  {
    id: 3,
    name: "System",
    items: [
      { id: 1, name: "User role & Authentication", path: "/roles" },

      { id: 2, name: "Notification", path: "/notification" },
      { id: 3, name: "settings", path: "/settings" },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.user);
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
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
    subPath?: { id: number; name: string; path: string }[];
  };
  pathname: string;
}) {
  const withSubItem = (
    <SidebarMenuItem key={item.id}>
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroup className="p-0 text-lg">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="peer/menu-button ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm !font-medium outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0">
              {item.name}
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
                    <a href={subItem.path}>{subItem.name}</a>
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
        <a href={item.path}>{item.name}</a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
  return (
    <SidebarMenu>{item.subPath ? withSubItem : withoutSubItem}</SidebarMenu>
  );
}
