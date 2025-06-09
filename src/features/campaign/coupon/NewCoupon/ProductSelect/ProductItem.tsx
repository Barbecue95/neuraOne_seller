import { Button } from "@/components/ui/button";
import { DeleteIcon, EditIcon } from "lucide-react";
import React from "react";

export default function ProductItem() {
  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <span>1</span>
      <div className="flex flex-row items-center gap-2">
        <div className="bg-muted-foreground size-10" />
        <h3>Product Name</h3>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Button
          variant="default"
          className="rounded-full"
          size="icon"
          onClick={() => {}}
        >
          <EditIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="default"
          className="rounded-full"
          size="icon"
          onClick={() => {}}
        >
          <DeleteIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
