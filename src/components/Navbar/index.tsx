"use client";

import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { SiteMapItem } from "@/types/sidebar.types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import { siteMap } from "@/utils/siteMap";
import Image from "next/image";
import { useSidebar } from "../ui/sidebar";

const Index = () => {
  const pathname = usePathname();
  const path = "/" + pathname.split("/")[1];
  const item = siteMap.reduce<SiteMapItem | undefined>((foundTitle, group) => {
    if (foundTitle) return foundTitle;
    const itemWithTitle = group.items.find(
      (item) =>
        item.path === path ||
        (item.subPath && item.subPath.some((sub) => sub.path === path)),
    );
    return itemWithTitle;
  }, undefined);
  const displayTitle = item?.name || "Dashboard";
  const { state, setOpenMobile } = useSidebar();

  if (pathname === "/login") return null;

  return (
    <nav className="bg-card text-primary sticky top-0 z-50 flex h-24 w-full flex-col-reverse justify-around py-2 px-10 md:h-16 md:flex-row md:items-center md:justify-between">
      <div className="flex w-full items-center justify-start gap-2 md:w-auto md:justify-center">
        <Image
          src="logo.svg"
          alt="logo"
          width={30}
          height={40}
          className="hidden md:block"
        />
        <Link
          href={item?.path || "/"}
          className="text-accent-foreground text-lg font-semibold capitalize"
        >
          {displayTitle}
        </Link>
      </div>
      <div className="flex items-center justify-between gap-2 md:justify-center">
        <div
          onClick={() => setOpenMobile(true)}
          className="flex md:hidden items-center justify-center rounded-full bg-[#E4E6FF] p-2"
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
        <div className="flex items-center justify-center gap-1 ">
          {/* <Search /> */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:!bg-primary text-secondary-foreground"
          >
            <Link href="/notification">
              <Bell />
            </Link>
          </Button>

          <div className="flex flex-row items-center gap-2">
            <Avatar className="size-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="neuraOne" />
              <AvatarFallback>NO</AvatarFallback>
            </Avatar>
            <div className="hidden flex-col md:flex">
              <h1 className="text-accent-foreground text-lg font-semibold">
                NeuraOne
              </h1>
              <h3 className="text-primary text-xs">Admin</h3>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Index;
