"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CustomerListFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
  categories: string[];
}

const CustomerListFilters = ({
  searchQuery,
  onSearchChange,
}: CustomerListFiltersProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1>All Customers</h1>

      <div className="relative w-64">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <Input
          placeholder="Search product"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
};

export default CustomerListFilters;
