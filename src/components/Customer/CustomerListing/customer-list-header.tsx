"use client";

import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/hooks/use-query-params";
import { useRouter } from "next/navigation";
import AddCustomerModal from "../CreateCustomer/create-customer-modal";
import { SortDropdown } from "./sort-dropdown";

interface CustomerListHeaderProps {
  onImport?: () => void;
  onExport?: () => void;
}

const CustomerListHeader = ({
  onImport,
  onExport,
}: CustomerListHeaderProps) => {
  const router = useRouter();
  const { setParam } = useQueryParams();
  const onAddProduct = () => {
    setParam("step", "1", "/products/create");
  };
  return (
    <div className="flex items-center justify-end md:justify-between py-4">
      <h1 className="text-2xl font-medium hidden md:flex">Customer List</h1>
      <div className="flex items-center gap-2">
        <SortDropdown />
        <AddCustomerModal />
      </div>
    </div>
  );
};

export default CustomerListHeader;
