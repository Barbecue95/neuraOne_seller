import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SidebarItem } from "./Sidebar";
import IconArrowUp from "../icons/IconArrowUp";
import IconArrowDown from "../icons/IconArrowDown";

export function SidebarItems({
  item,
  pathname,
}: {
  item: SidebarItem;
  pathname: string;
}) {
  const { icon, name, path, subPath } = item;
  const [open, setOpen] = useState(false);

  const toggleSubMenu = (e: Event) => {
    if (subPath) {
      e.preventDefault();
      setOpen(!open);
    }
  };

  const isActive = useMemo(() => path === pathname, [path, pathname]);
  const isSubPathActive = useMemo(
    () => subPath?.some((subItem) => subItem.path === pathname),
    [subPath, pathname]
  );

  useEffect(() => {
    if (subPath && !isSubPathActive) {
      setOpen(false);
    }
    if (subPath && isSubPathActive) {
      setOpen(true);
    }
  }, [pathname]);

  return (
    <li className="">
      <Link
        href={path}
<<<<<<< HEAD
        onClick={toggleSubMenu}
        className={`inline-block w-full p-3 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white duration-150 ${
          path === pathname && "text-white bg-blue-500"
=======
        onClick={(e) => {
          toggleSubMenu(e);
        }}
        className={`flex justify-between items-center w-full p-1.5 cursor-pointer rounded-md ${
          isActive
            ? "text-white bg-zinc-600"
            : "hover:bg-zinc-600 hover:text-white duration-150"
>>>>>>> 7993a86051a650c356d230e293c06c55b50fc387
        }`}
      >
        <span className="flex gap-2 items-center">
          {icon}
          {name}
        </span>
        {subPath && open && <IconArrowUp className="size-5" />}
        {subPath && !open && <IconArrowDown className="size-5" />}
      </Link>
      {subPath && open && (
        <div className="ml-4 py-2 space-y-1.5">
          {subPath?.map((subItem: any) => (
            <Link
              key={subItem.id}
              href={subItem.path}
              className={`flex gap-2 w-full p-1.5 cursor-pointer rounded-md ${
                subItem.path === pathname
                  ? "text-white bg-zinc-600"
                  : "hover:bg-zinc-600 hover:text-white duration-150"
              }`}
            >
              {subItem.icon}
              {subItem.name}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}
