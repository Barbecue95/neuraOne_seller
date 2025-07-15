"use client";

import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/hooks/use-query-params";
import { useRouter } from "next/navigation";
import AddCustomerModal from "../CreateCustomer/create-customer-modal";

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
    <div className="flex items-center justify-between py-4">
      <h1 className="text-2xl font-medium">Customer List</h1>
      <div className="flex items-center gap-2">
        <AddCustomerModal />
      </div>
    </div>
  );
};

export default CustomerListHeader;
