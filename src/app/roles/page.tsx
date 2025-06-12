"use client";

import SubNavbar from "@/components/SubNavbar";
import Table from "@/features/roles/Table";

export default function Home() {
  return (
    <div className="h-full">
      <SubNavbar
        title="User Roles"
        buttons={[
          { title: "Sort By", action: () => {} },
          { title: "Add New user role", action: () => {} },
        ]}
      />
      <Table />
    </div>
  );
}
