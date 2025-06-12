"use client";
import SubNavbar from "@/components/SubNavbar";
import Table from "@/features/campaign/coupon/Table";
import { useRouter } from "next/navigation";
import React from "react";

const Coupon = () => {
  const router = useRouter();
  return (
    <div>
      <SubNavbar
        title="Coupons"
        buttons={[
          {
            title: "Add new coupon",
            action: () => router.push("/campaign/coupon/create"),
          },
        ]}
      />
      <Table />
    </div>
  );
};

export default Coupon;
