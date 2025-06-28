"use client";

import { useState } from "react";
import SubNavbar from "@/components/SubNavbar";
import Table from "@/features/category/Table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Home() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="h-full">
      <SubNavbar
        title="Product Category List"
        buttons={[
          { title: "Sort By", action: () => {} },
          { title: "Add Category", action: () => setOpenDialog(true) },
        ]}
      />

      <Table />

      {/* Inline Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input
              className="w-full rounded border px-3 py-2"
              placeholder="Category Name"
            />
            <input
              className="w-full rounded border px-3 py-2"
              placeholder="Product Name"
            />
            <select className="w-full rounded border px-3 py-2">
              <option>Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Archived</option>
            </select>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
