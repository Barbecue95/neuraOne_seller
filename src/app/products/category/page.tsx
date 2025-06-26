"use client";
import SubNavbar from "@/components/SubNavbar";
import Table from "@/features/category/Table";

export default function Home() {
  return (
    <div className="h-full">
      <SubNavbar
        title="Product Category List"
        buttons={[
          { title: "Sort By", action: () => {} },
          { title: "Add Product", action: () => {} },
        ]}
      />
      <Table />
    </div>
  );
}
