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

import { ChevronDown } from "lucide-react";
import { SiteMapItem } from "@/types/sidebar.types";

import { usePathname } from "next/navigation";
import { siteMap } from "@/utils/siteMap";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export function AppSidebar() {
  const pathname = usePathname();
  const { state, isMobile, openMobile, setOpen, toggleSidebar } = useSidebar();

  if (pathname === "/login") {
    return null;
  }

  return (
    <Sidebar
      collapsible="icon"
      side="left"
      className="fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out data-[state=collapsed]:-translate-x-full"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <SidebarHeader className="md:h-20 xl:h-24">
        <div className="flex h-16 items-center justify-between px-2 md:sr-only">
          <Image
            src="/logo.svg"
            alt="logo"
            width={40}
            height={56}
            className=" block"
          />
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleSidebar}
            className="size-12 flex cursor-pointer items-center justify-center rounded-full bg-transparent "
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 7H11C11.2652 7 11.5196 7.10536 11.7071 7.29289C11.8946 7.48043 12 7.73478 12 8C12 8.26522 11.8946 8.51957 11.7071 8.70711C11.5196 8.89464 11.2652 9 11 9H6C5.73478 9 5.48043 8.89464 5.29289 8.70711C5.10536 8.51957 5 8.26522 5 8C5 7.73478 5.10536 7.48043 5.29289 7.29289C5.48043 7.10536 5.73478 7 6 7ZM13 15H18C18.2652 15 18.5196 15.1054 18.7071 15.2929C18.8946 15.4804 19 15.7348 19 16C19 16.2652 18.8946 16.5196 18.7071 16.7071C18.5196 16.8946 18.2652 17 18 17H13C12.7348 17 12.4804 16.8946 12.2929 16.7071C12.1054 16.5196 12 16.2652 12 16C12 15.7348 12.1054 15.4804 12.2929 15.2929C12.4804 15.1054 12.7348 15 13 15ZM6 11H18C18.2652 11 18.5196 11.1054 18.7071 11.2929C18.8946 11.4804 19 11.7348 19 12C19 12.2652 18.8946 12.5196 18.7071 12.7071C18.5196 12.8946 18.2652 13 18 13H6C5.73478 13 5.48043 12.8946 5.29289 12.7071C5.10536 12.5196 5 12.2652 5 12C5 11.7348 5.10536 11.4804 5.29289 11.2929C5.48043 11.1054 5.73478 11 6 11Z"
                fill="#3C3C3C"
              />
            </svg>
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {siteMap.map((group) => (
          <SidebarGroup key={group.id} className="py-0">
            <SidebarGroupContent>
              {group.items.map((item) => (
                <SidebarMenu
                  className="group-data-[state=collapsed]:pl-8"
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
