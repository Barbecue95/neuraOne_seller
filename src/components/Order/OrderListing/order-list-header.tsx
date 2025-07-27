"use client";

import { SortDropdown } from "./sort-dropdown";

interface OrderListHeaderProps {
  onImport?: () => void;
  onExport?: () => void;
}

const OrderListHeader = ({ onImport, onExport }: OrderListHeaderProps) => {
  return (
    <div className="flex items-center justify-end py-4 md:justify-between">
      <h1 className="hidden text-2xl font-medium md:flex">Order List</h1>
      <div className="flex items-center gap-2">
        <SortDropdown />
      </div>
    </div>
  );
};

export default OrderListHeader;
