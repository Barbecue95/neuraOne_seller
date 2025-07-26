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

import { ChevronDown } from "lucide-react";
import { SiteMapItem } from "@/types/sidebar.types";

import { usePathname } from "next/navigation";
import { siteMap } from "@/utils/siteMap";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();
  const { state, isMobile, openMobile } = useSidebar();

  if (pathname === "/login") {
    return null;
  }

  return (
    <Sidebar collapsible="icon" side="left">
      <SidebarHeader className="md:h-20 xl:h-24">
        <SidebarGroupLabel className="sr-only text-base font-semibold lg:text-lg">
          NeuraOne
        </SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        {siteMap.map((group) => (
          <SidebarGroup key={group.id} className="py-0">
            <SidebarGroupContent>
              {group.items.map((item) => (
                <SidebarMenu
                  className="group-data-[state=collapsed]:items-center"
                  key={item.id}
                >
                  <SidebarItemRender
                    item={item}
                    key={item.id}
                    pathname={pathname}
                    state={state}
                    isMobile={isMobile && openMobile}
                  />
                </SidebarMenu>
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
  state,
  isMobile,
  pathname,
}: {
  item: SiteMapItem;
  pathname: string;
  isMobile: boolean;
  state: "expanded" | "collapsed";
}) {
  const withSubItem = (
    <Collapsible className="group/collapsible" key={item.id}>
      <SidebarMenuItem className="list-none">
        <CollapsibleTrigger asChild>
          {/* <SidebarMenuButton variant="primary">
            {item.icon}
            <span className="text-nowrap group-[state=collapsed]:hidden">
              {item.name}
            </span>
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </SidebarMenuButton> */}
          {state === "collapsed" ? (
            <SidebarMenuButton
              asChild
              isActive={pathname === item.path}
              variant={"primary"}
            >
              <a href={item.path}>{item.icon}</a>
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton
              variant={"primary"}
              className={cn([
                {
                  "hover:sidebarBackground active:sidebarBackground text-accent-foreground hover:text-accent rounded-none":
                    isMobile,
                },
              ])}
            >
              {item.icon}
              <span className="text-base text-nowrap group-data-[state=collapsed]:hidden lg:text-lg">
                {item.name}
              </span>
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </SidebarMenuButton>
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.subPath?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.id}>
                <SidebarMenuSubButton
                  asChild
                  isActive={pathname === subItem.path}
                  className={cn([
                    {
                      "hover:sidebarBackground active:sidebarBackground text-accent-foreground hover:text-accent rounded-none":
                        isMobile,
                    },
                  ])}
                >
                  <a href={subItem.path}>
                    {subItem.icon}
                    <span className="text-base group-data-[state=collapsed]:hidden lg:text-lg">
                      {subItem.name}
                    </span>
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
    <SidebarMenuItem key={item.id}>
      <SidebarMenuButton
        variant="primary"
        asChild
        isActive={pathname === item.path}
        className={cn([
          {
            "hover:sidebarBackground active:sidebarBackground text-accent-foreground hover:text-accent rounded-none":
              isMobile,
          },
        ])}
      >
        <a href={item.path} className="p-2">
          {item.icon}
          <span className="text-base text-nowrap group-data-[state=collapsed]:hidden lg:text-lg">
            {item.name}
          </span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
  return item.subPath ? withSubItem : withoutSubItem;
}
