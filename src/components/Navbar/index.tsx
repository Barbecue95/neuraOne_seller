"use client";
import React from "react";

import { usePathname } from "next/navigation";
import { siteMap } from "../Sidebar";
import { SiteMapItem } from "@/types/sidebar.types";
import Search from "./Search";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

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

  return (
    <nav className="bg-card text-primary sticky top-0 z-50 flex h-16 w-full items-center justify-between px-10">
      <Link
        href={item?.path || "/"}
        className="text-accent-foreground text-lg font-semibold capitalize"
      >
        {displayTitle}
      </Link>
      <div className="flex items-center gap-2">
        <Search />
        <Button
          variant="ghost"
          size="icon"
          className="hover:!bg-primary text-secondary-foreground"
        >
          <Bell />
        </Button>

        <div className="flex flex-row items-center gap-2">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="neuraOne" />
            <AvatarFallback>NO</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-accent-foreground text-lg font-semibold">
              NeuraOne
            </h1>
            <h3 className="text-primary text-xs">Admin</h3>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Index;
