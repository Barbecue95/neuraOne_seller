"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface CustomerListFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
}

const CustomerListFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
}: CustomerListFiltersProps) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-t-[20px] p-5">
      <h1 className="text-xl font-medium">All Customers</h1>

      <div className="relative max-w-40 md:max-w-80">
        <Search className="absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 transform text-[#A1A1A1]" />
        <Input
          placeholder="Search customer name or id"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 text-lg font-medium text-[#A1A1A1] h-auto pt-2.5 pb-2 rounded-[20px]"
        />
      </div>
    </div>
  );
};

export default CustomerListFilters;
