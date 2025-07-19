import { Button } from "@/components/ui/button";
import { ChevronLeft, CopyIcon } from "lucide-react";
import React from "react";

export default function ProductHeader({
  isEdit = false,
  title = "Add new product",
  handleDuplicate,
}: {
  isEdit?: boolean;
  title?: string;
  handleDuplicate?: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Button asChild variant="ghost" className="flex items-center">
          <a href="/products" className="flex items-center text-xl font-medium">
            <ChevronLeft className="size-6" /> {title}
          </a>
        </Button>
        {isEdit && (
          <Button variant="ghost" onClick={handleDuplicate}>
            <CopyIcon /> Duplicate
          </Button>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          className="rounded-full bg-[#A1A1A1] px-7 py-2 text-white hover:bg-[#A1A1A1b5]"
        >
          Discard
        </Button>
        <Button
          variant="default"
          type="submit"
          className="rounded-full px-7 py-2"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
