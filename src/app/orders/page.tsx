"use client";
import OrderList from "@/components/Order/OrderListing";

export default function Home() {
  return (
    <div className="bg-background h-full w-full p-4 md:p-8">
      <OrderList />
    </div>
  );
}
