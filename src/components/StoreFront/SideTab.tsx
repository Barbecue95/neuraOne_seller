import { cn } from "@/lib/utils";
import React from "react";

type Tab = {
  id: number;
  label: string;
};

type Props = {
  selectedTab: number;
  setSelectedTab: (id: number) => void;
};

const tabs: Tab[] = [
  { id: 1, label: "Store Information" },
  { id: 2, label: "Privacy and Policy" },
  { id: 3, label: "Banners" },
];

export default function SideTab({ selectedTab, setSelectedTab }: Props) {
  return (
    <div
      role="tablist"
      aria-orientation="vertical"
      className="flex flex-col overflow-hidden rounded-[10px]"
    >
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={selectedTab === tab.id}
          className={cn(
            "cursor-pointer p-5 text-left text-xl font-medium transition-colors duration-200 ease-in-out focus:outline-none",
            index !== tabs.length - 1 &&
              "border-b border-[#EEEEEE] dark:border-black",
            selectedTab === tab.id
              ? "bg-[#E4E6FF] dark:bg-neutral-800"
              : "bg-white hover:bg-[#E4E6FF] dark:bg-neutral-900 hover:dark:bg-gray-700"
          )}
          onClick={() => setSelectedTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
