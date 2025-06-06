"use client";

import SubNavbar from "@/components/SubNavbar";
import Table from "@/features/payments/Table";

export default function Home() {
  return (
    <div className="h-full">
      <SubNavbar
        title="Transactions List"
        buttons={[
          { title: "Sort By", action: () => {} },
          { title: "Export", action: () => {} },
        ]}
      />
      <div className="flex flex-row items-center justify-between gap-5 px-8 py-4">
        <div className="bg-secondary flex min-h-32 w-1/3 flex-col p-4">
          <h2 className="text-2xl font-semibold">10,3400 Ks</h2>
          <span>Total Revenue</span>
        </div>
        <div className="bg-secondary flex min-h-32 w-1/3 flex-col p-4">
          <h2 className="text-2xl font-semibold">10,3400 Ks</h2>
          <span>Pending transactions</span>
        </div>
        <div className="bg-secondary flex min-h-32 w-1/3 flex-col p-4">
          <h2 className="text-2xl font-semibold">10,3400 Ks</h2>
          <span>Paid transactions</span>
        </div>
      </div>
      <Table />
    </div>
  );
}
