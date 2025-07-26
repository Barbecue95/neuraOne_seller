import { Button } from "@/components/ui/button";
import { ChevronLeft, CopyIcon } from "lucide-react";
import Link from "next/link";
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
      <div className="hidden gap-2 md:flex">
        <Button
          variant="secondary"
          className="rounded-full bg-[#A1A1A1] px-7 py-2 text-white hover:bg-[#A1A1A1b5]"
          asChild
        >
          <Link href="/products">Discard</Link>
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
