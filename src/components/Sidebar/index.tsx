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
import { cn } from "@/lib/utils";
import { siteMap } from "@/utils/siteMap";

export function AppSidebar() {
  const pathname = usePathname();
  const { isMobile, state, setOpen, setOpenMobile } = useSidebar();

  if (pathname === "/login") {
    return null;
  }

  return (
    <Sidebar
      collapsible="icon"
      side="left"
      variant="sidebar"
      // onMouseEnter={() => setOpen(true)}
      // onMouseLeave={() => setOpen(false)}
    >
      <SidebarHeader className="flex flex-row items-center justify-center">
        {state === "collapsed" ? (
          <div
            onClick={() => setOpen(true)}
            className="flex cursor-pointer items-center justify-center rounded-full bg-[#E4E6FF] p-2"
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
          </div>
        ) : (
          <div className="flex flex-row items-center gap-2">
            {/* <Avatar className="size-12">
              <AvatarImage src="https://github.com/shadcn.png" alt="neuraOne" />
              <AvatarFallback>NO</AvatarFallback>
            </Avatar> */}
            <h1
              className={cn([
                "font-brand flex cursor-default flex-nowrap items-center text-2xl font-extralight",
                {
                  hidden: state !== "expanded",
                },
              ])}
            >
              <span className="text-primary dark:text-primary-foreground">
                neuraone
              </span>
            </h1>
            <div
              onClick={() => {
                if (isMobile) setOpenMobile(false);
                else setOpen(false);
              }}
              className="flex cursor-pointer items-center justify-center rounded-full bg-[#E4E6FF] p-1"
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
            </div>
          </div>
        )}
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
          <SidebarMenuButton variant="primary">
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
        <SidebarMenuButton
          variant="primary"
          asChild
          isActive={pathname === item.path}
        >
          <a href={item.path} className="p-2">
            {item.icon}
            <span className="text-nowrap">{item.name}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
  return item.subPath ? withSubItem : withoutSubItem;
}
