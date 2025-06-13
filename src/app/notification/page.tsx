"use client";
import SubNavbar from "@/components/SubNavbar";
import Table from "@/features/notification/Table";

export default function Home() {
  return (
    <div className="h-full">
      <SubNavbar
        title=""
        buttons={[
          { title: "Sort by", action: () => {} },
          { title: "Add Notification", action: () => {} },
        ]}
      />
      <Table />
    </div>
  );
}
