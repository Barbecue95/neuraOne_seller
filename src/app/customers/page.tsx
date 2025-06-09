"use client";
import SubNavbar from "@/components/SubNavbar";
import Table from "@/features/customers/Table";

export default function Home() {
  return (
    <div className="h-full">
      <SubNavbar
        title="Customers List"
        buttons={[
          { title: "Export", action: () => {} },
          { title: "Add Customer", action: () => {} },
        ]}
      />
      <Table />
    </div>
  );
}
