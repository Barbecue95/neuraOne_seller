import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import React from "react";

const index = ({
  className,
  btnClass,
  placeholder = "",
}: {
  className?: string;
  btnClass?: string;
  placeholder?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-primary-foreground flex w-64 items-center gap-2 rounded-md px-1 py-0.5",
        className,
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn("text-muted-foreground hover:bg-accent", btnClass)}
      >
        <Search />
      </Button>
      <input
        type="text"
        className="w-full bg-transparent text-sm outline-none"
        placeholder={placeholder}
      />
    </div>
  );
};

export default index;
