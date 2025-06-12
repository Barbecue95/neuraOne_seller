import { Separator } from "@/components/ui/separator";
import React from "react";

export default function ProductItem() {
  return (
    <>
      <div className="flex flex-row items-center justify-between gap-2 py-2">
        <div className="flex flex-row items-center gap-2">
          <div className="bg-muted-foreground size-10" />
          <h3 className="pnpm dlx shadcn@latest add separator">Product Name</h3>
        </div>
        <div>
          <div className="bg-primary size-5 rounded-full p-2" />
        </div>
      </div>
      <Separator />
    </>
  );
}
