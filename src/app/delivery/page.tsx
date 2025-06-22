"use client";
import SubNavbar from "@/components/SubNavbar";
import Table from "@/features/delivery/Table";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-full">
      <SubNavbar
        title="Shipment List"
        buttons={[
          { title: "Sort By", action: () => {} },
          {
            title: "Add new Shipment sender",
            action: () => {
              router.push("/delivery/create");
            },
          },
        ]}
      />
      <Table />
    </div>
  );
}
