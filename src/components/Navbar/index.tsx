"use client";
import React from "react";

import { usePathname } from "next/navigation";
import { siteMap } from "../Sidebar";
import { SiteMapGroup } from "@/types/sidebar.types";
import Search from "./Search";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";

const Index = () => {
  const pathname = usePathname();
  const title = siteMap.reduce<string | undefined>(
    (foundTitle, group: SiteMapGroup) => {
      if (foundTitle) return foundTitle;

      const itemWithTitle = group.items.find(
        (item) =>
          item.path === pathname ||
          (item.subPath && item.subPath.some((sub) => sub.path === pathname)),
      );

      return itemWithTitle?.name;
    },
    undefined,
  );
  const displayTitle = title || "Dashboard";

  return (
    <nav className="bg-accent text-primary sticky top-0 z-50 flex h-16 w-full items-center justify-between px-10">
      <span className="text-lg font-semibold text-neutral-950 capitalize">
        {displayTitle}
      </span>
      <div className="flex items-center gap-2">
        <Search />
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-primary-foreground text-neutral-950"
        >
          <Bell />
        </Button>

        <div className="flex flex-row items-center gap-2">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="neuraOne" />
            <AvatarFallback>NO</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-neutral-950">NeuraOne</h1>
            <h3 className="text-xs text-neutral-950">Admin</h3>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Index;
