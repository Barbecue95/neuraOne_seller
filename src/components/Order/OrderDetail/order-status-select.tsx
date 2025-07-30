"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatus } from "./order-status-badge";
import { ChevronDownIcon } from "lucide-react";

const statusLabelMap: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "Pending",
  [OrderStatus.PROCESSING]: "Processing",
  [OrderStatus.PACKAGING]: "Packaging",
  [OrderStatus.DELIVERING]: "Delivering",
  [OrderStatus.DELIVERED]: "Delivered",
};

type Props = {
  value: OrderStatus;
  onChange: (status: OrderStatus) => void;
};

const OrderStatusChanger = () => {
  const handleChange = (value: string) => {
    // TODO: Call API or update state here
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger
        className="bg-primary text-accent w-[150px]"
        disabledIcon={true}
      >
        <SelectValue placeholder="Change status" className="text-accent" />
        <ChevronDownIcon className="size-4 text-accent opacity-50" />
      </SelectTrigger>
      <SelectContent className="rounded-[10px] p-0">
        {Object.entries(statusLabelMap).map(([key, label]) => (
          <SelectItem key={key} value={key} className="">
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default OrderStatusChanger;
