
"use client";
import CustomerList from "@/components/Customer/CustomerListing";
import SubNavbar from "@/components/SubNavbar";
import Table from "@/features/customers/Table";

export default function CustomerPage() {
  return (
    <div className="h-full w-full bg-[#F6F1F4] dark:bg-gray-800 p-4 md:p-8">
      <CustomerList />
    </div>
  );
}
