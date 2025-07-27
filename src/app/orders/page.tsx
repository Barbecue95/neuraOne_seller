"use client";
import OrderList from "@/components/Order/OrderListing";

export default function Home() {
  return (
    <div className="h-full w-full bg-[#F6F1F4] p-4 dark:bg-gray-800 md:p-8">
      <OrderList />
    </div>
  );
}
