"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryParams } from "@/hooks/use-query-params";
import { useRouter } from "next/navigation";

interface ProductListHeaderProps {
  onImport?: () => void;
  onExport?: () => void;
  onSortChange?: (value: string) => void;
}

const ProductListHeader = ({
  onImport,
  onExport,
  onSortChange,
}: ProductListHeaderProps) => {
  const router = useRouter();
  const { setParam } = useQueryParams();
  const onAddProduct = () => {
    setParam("step", "1", "/products/create");
  };
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold">Product List</h1>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onImport}>
          Import
        </Button>
        <Button variant="outline" size="sm" onClick={onExport}>
          Export
        </Button>
        <Select defaultValue="name" onValueChange={onSortChange}>
          <SelectTrigger className="h-8 w-24">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="category">Category</SelectItem>
            <SelectItem value="stock">Stock</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
        <Button size="sm" onClick={onAddProduct}>
          Add product
        </Button>
      </div>
    </div>
  );
};

export default ProductListHeader;
