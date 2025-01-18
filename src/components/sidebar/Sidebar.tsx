"use client";

import { usePathname } from "next/navigation";
import { SidebarItems } from "./SidebarItems";

const sidebarItems = [
  { id: 1, name: "Dashboard", path: "/" },
  {
    id: 2,
    name: "Inventory",
    path: "/inventory",
    subPath: [
      { id: 1, name: "Products", path: "/inventory/products" },
      { id: 2, name: "Purchases", path: "/inventory/purchases" },
    ],
  },
  { id: 3, name: "Orders", path: "/orders" },
  { id: 4, name: "Customers", path: "/customers" },
  { id: 5, name: "Reports", path: "/reports" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <header className="p-3 space-y-5 h-full border shadow-[0px_0px_20px_#91919150]">
      <div>
        <h1 className="font-semibold cursor-default">JU Admin</h1>
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
