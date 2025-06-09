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
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { ChevronDown } from "lucide-react";
import { SiteMapItem } from "@/types/sidebar.types";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { siteMap } from "@/utils/siteMap";

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
            <span className="text-primary dark:text-primary-foreground">
              neuraone
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
  item: SiteMapItem;
  pathname: string;
}) {
  const withSubItem = (
    <Collapsible className="group/collapsible" key={item.id}>
      <SidebarMenuItem className="list-none">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
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
                    <span className="text-primary">{subItem.icon}</span>
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
