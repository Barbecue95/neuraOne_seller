import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React from "react";

const index = () => {
  return (
    <div className="bg-primary-foreground flex w-64 items-center gap-2 rounded-md px-1 py-0.5">
      <Button variant="ghost" size="icon" className="text-muted-foreground">
        <Search />
      </Button>
      <input
        type="text"
        className="w-full bg-transparent text-sm outline-none"
      />
    </div>
  );
};

export default index;
