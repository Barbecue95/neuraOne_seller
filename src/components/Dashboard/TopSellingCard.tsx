import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function TopSellingCard() {
  return (
    <div className="bg-card flex items-center gap-4 py-2">
      <Avatar className="h-12 w-12 rounded-xl">
        <AvatarFallback className="rounded-xl">UI</AvatarFallback>
        <AvatarImage />
      </Avatar>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg">Nike Air Force</h1>
        <p className="text-primary">50 sold</p>
      </div>
    </div>
  );
}
