"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import React from "react";

const SettingsThemeButton = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Select defaultValue={theme ?? "light"} onValueChange={setTheme}>
      <SelectTrigger className="w-full rounded-[20px] border-none px-4 py-6">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
      </SelectContent>
    </Select>
  );
  // return (
  //   <button
  //     className="dark:border-accent-foreground border-secondary-foreground hover:bg-accent w-full border px-4 py-2 text-left"
  //     onClick={() => {
  //       setTheme(theme === "dark" ? "light" : "dark");
  //     }}
  //   >
  //     <span className="scroll-m-20 text-xl font-semibold tracking-tight">
  //       {theme === "dark" ? "Light" : "Dark"}
  //     </span>
  //   </button>
  // );
};

export default SettingsThemeButton;
