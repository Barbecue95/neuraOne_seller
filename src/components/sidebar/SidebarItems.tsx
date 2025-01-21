import Link from "next/link";
import { useState } from "react";

export function SidebarItems({ item, pathname }) {
  const { name, path, subPath } = item;
  const [open, setOpen] = useState(false);

  const toggleSubMenu = (e: any) => {
    if (subPath) {
      e.preventDefault();
      setOpen(!open);
    }
  };
  return (
    <li className="">
      <Link
        href={path}
        onClick={toggleSubMenu}
        className={`inline-block w-full p-3 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white duration-150 ${
          path === pathname && "text-white bg-blue-500"
        }`}
      >
        {name}
      </Link>
      {subPath && open && (
        <div className="ml-4 py-2 space-y-1.5">
          {subPath?.map((subItem: any) => (
            <Link
              key={subItem.id}
              href={subItem.path}
              className={`inline-block w-full p-2 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white duration-150 ${
                subItem.path === pathname && "text-white bg-blue-500"
              }`}
            >
              {subItem.name}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}
