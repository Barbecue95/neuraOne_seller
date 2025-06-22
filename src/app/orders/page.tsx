"use client";
import Table from "@/features/orders/Table";
import SubNavbar from "@/components/SubNavbar";

export default function Home() {
  return (
    <div className="h-full">
      <SubNavbar
        title="Orders List"
        buttons={[
          { title: "Sort By", action: () => {} },
          { title: "Add Product", action: () => {} },
        ]}
      />
      <div className="flex w-full flex-row flex-wrap gap-4 px-8 pb-4">
        <div className="bg-accent flex min-w-44 flex-1/6 flex-col p-4">
          <span className="text-2xl font-semibold">25</span>
          <span>Pending Orders</span>
        </div>
        <div className="bg-accent flex min-w-44 flex-1/6 flex-col p-4">
          <span className="text-2xl font-semibold">25</span>
          <span>Approved Orders</span>
        </div>
        <div className="bg-accent flex min-w-44 flex-1/6 flex-col p-4">
          <span className="text-2xl font-semibold">25</span>
          <span>Shipping Orders</span>
        </div>
        <div className="bg-accent flex min-w-44 flex-1/6 flex-col p-4">
          <span className="text-2xl font-semibold">25</span>
          <span>Shipped Orders</span>
        </div>
        <div className="bg-accent flex min-w-44 flex-1/6 flex-col p-4">
          <span className="text-2xl font-semibold">25</span>
          <span>Fullfilled Orders</span>
        </div>
      </div>
      <Table />
    </div>
  );
}
