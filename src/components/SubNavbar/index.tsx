"use client";
import React from "react";
import { Button } from "../ui/button";

interface SubNavbarProps {
  title: string;
  buttons?: { title: string; action: () => void }[];
}

const SubNavbar = ({ title, buttons }: SubNavbarProps) => {
  return (
    <div className="text-primary flex w-full flex-row items-center justify-between px-8 py-4">
      <h2 className="text-accent-foreground text-lg font-semibold capitalize">
        {title}
      </h2>
      <div className="flex flex-row items-center gap-2">
        {buttons?.map((button, index) => (
          <Button variant="default" key={index} onClick={button.action}>
            {button.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SubNavbar;
