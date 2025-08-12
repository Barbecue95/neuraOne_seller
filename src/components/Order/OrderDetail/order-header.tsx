"use client";

import { ChevronLeft } from "lucide-react";
import React from "react";
import OrderStatusChanger from "./order-status-select";
import { useRouter } from "next/navigation";
import { Order } from "@/types/order.types";
import { OrderStatus } from "./order-status-badge";

const OrderHeader = ({ order }: { order: Order }) => {
  const router = useRouter();
  return (
    <div className="text-primary flex w-full flex-row items-center justify-between px-4 py-4">
      <div
        className="group flex cursor-pointer items-center justify-center"
        onClick={() => router.back()}
      >
        <ChevronLeft className="text-accent-foreground group-hover:text-primary h-6 w-6" />
        <h2 className="text-accent-foreground group-hover:text-primary text-xl font-semibold capitalize">
          Order Detail
        </h2>
      </div>
      {order.status !== OrderStatus.PENDING && (
        <div className="flex flex-row items-center gap-2">
          <OrderStatusChanger
            value={order.status as OrderStatus}
            onChange={() => {}}
            id={order.id}
          />
        </div>
      )}
    </div>
  );
};

export default OrderHeader;
