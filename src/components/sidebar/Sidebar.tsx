"use client";

import { usePathname } from "next/navigation";
import { SidebarItems } from "./SidebarItems";
import Link from "next/link";
import { ReactNode } from "react";
import IconDashboard from "../icons/IconDashboard";
import IconProduct from "../icons/IconProduct";

export interface SidebarItem {
  id: number;
  icon: ReactNode;
  name: string;
  path: string;
  subPath?: { id: number; icon: ReactNode; name: string; path: string }[];
}

export const sidebarItems: SidebarItem[] = [
  {
    id: 1,
    icon: <IconDashboard className="size-6" />,
    name: "Dashboard",
    path: "/",
  },
  {
    id: 2,
    icon: <IconProduct className="size-6" />,
    name: "Products",
    path: "/products",
    subPath: [
      {
        id: 1,
        icon: <IconProduct className="size-6" />,
        name: "Products List",
        path: "/products",
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <header className="col-span-2 p-3 space-y-5 h-full border shadow-[0px_0px_20px_#91919150]">
      <div>
        <Link href="/" className="font-semibold inline-block w-full">
          JU Admin
        </Link>
      </div>
      <nav className="text-sm">
        <ul className="space-y-2">
          {sidebarItems.map((item: any) => (
            <SidebarItems key={item.id} item={item} pathname={pathname} />
          ))}
        </ul>
      </nav>
    </header>
  );
}
