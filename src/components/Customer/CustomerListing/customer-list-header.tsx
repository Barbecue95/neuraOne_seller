"use client";

import { Button } from "@/components/ui/button";
import AddCustomerModal from "../CreateCustomer/create-customer-modal";

interface CustomerListHeaderProps {
  onImport?: () => void;
  onExport?: () => void;
}

const CustomerListHeader = ({
  onImport,
  onExport,
}: CustomerListHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold">Customer List</h1>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onImport}>
          Import
        </Button>
        <Button variant="outline" size="sm" onClick={onExport}>
          Export
        </Button>
        <AddCustomerModal />
      </div>
    </div>
  );
};

export default CustomerListHeader;
