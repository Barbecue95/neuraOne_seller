"use client";
import {
  CheckIcon,
  Edit,
  MinusCircleIcon,
  PlusCircleIcon,
  Trash2,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import OrderStatusBadge, { OrderStatus } from "./order-status-badge";
import {
  Order,
  OrderItemPayload,
  UpdateOrderPayload,
} from "@/types/order.types";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/numberFormat";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const OrderInfo = ({
  order,
  isOrderUpdating,
  onUpdate,
}: {
  order: Order;
  isOrderUpdating: boolean;
  onUpdate: (data: UpdateOrderPayload, onSuccess?: () => void) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState({ id: 0, value: 0 });
  const LocalRenderQuantity = useCallback(
    (id: number, value: number) => {
      if (id !== quantity.id) return value;
      return quantity.value;
    },
    [quantity]
  );
  const handleUpdate = (item: Omit<OrderItemPayload, "totalAmount">) => {
    if (quantity.value <= 0) return;
    setIsEditing(false);
    const items = order.items
      .filter((i) => i.id !== item.id)
      .map((item) => ({
        id: item.id,
        orderId: item.orderId,
        productId: item.productId,
        variantValueId: item.variantValueId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }));

    onUpdate(
      {
        items: [
          {
            id: item.id,
            orderId: item.orderId,
            quantity: quantity.value,
            unitPrice: item.unitPrice,
            productId: item.productId,
            variantValueId: item.variantValueId,
            totalAmount: String(quantity.value * Number(item.unitPrice)),
          },
          ...items,
        ],
      },
      () => {
        setQuantity({ id: 0, value: 0 });
        toast.success("Item Updated Successfully");
      }
    );
  };

  const handleOnEditToggle = (id: number, quantity: number) => {
    setIsEditing((prev) => !prev);
    setQuantity({ id, value: quantity });
  };
  const handleOnDelete = (id: number) => {
    if (order.items.length === 1) {
      toast.warning("Can't Delete last Item");
      return;
    }
    const items = order.items.filter((item) => item.id !== id);
    onUpdate({
      items,
    });
  };
  return (
    <div className="bg-card rounded-md">
      {/* Order Info */}
      <div className="flex items-start justify-between p-5">
        <div>
          <h2 className="text-custom-dark-gray mb-1 text-xl font-medium">
            Order ID - {order.id}
          </h2>
          <p className="text-custom-gray-100 text-sm">
            ordered time {format(new Date(order.createdAt), "dd MMM yyyy")} at{" "}
            {format(new Date(order.createdAt), "hh:mm a")}
          </p>
        </div>
        <OrderStatusBadge status={order.status as OrderStatus} />
      </div>

      {/* Ordered Items */}
      <div className="border-t p-5">
        <h3 className="text-custom-dark-gray text-base font-medium">
          Ordered Items
        </h3>

        {order.items.map((item, i) => (
          <div
            key={item.id}
            className="grid grid-cols-3 gap-4 rounded-lg border-b py-3 md:grid-cols-6"
          >
            <div className="col-span-2 flex items-center justify-between gap-3 md:order-1">
              <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-white dark:bg-neutral-800">
                <Image
                  src="/images/file.svg?height=100&width=100&text=👟"
                  alt={item.variantValue.name}
                  width={100}
                  height={100}
                  className="rounded"
                />
              </div>
              <div className="flex h-full w-full flex-col justify-between">
                <h4 className="text-custom-gray-100 text-xl font-medium">
                  {item.product.name}
                </h4>
                {item.variantValue.variantValues.map((variant, i) => (
                  <p
                    key={i}
                    className="text-custom-gray-100 text-base font-normal"
                  >
                    {variant.name} : {variant.value}
                  </p>
                ))}
              </div>
            </div>
            <div className="order-3 col-span-3 flex items-center justify-between md:order-2">
              <div className="w-10 md:hidden"></div>
              <div className="text-center">
                <p className="text-custom-dark-gray text-base font-medium">
                  {formatCurrency(Number(item.unitPrice))}
                </p>
              </div>
              <div className="text-center">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      className="hover:text-primary"
                      variant="ghost"
                      onClick={() => {
                        setQuantity((prev) => {
                          if (prev.value > 1)
                            return { id: prev.id, value: prev.value - 1 };
                          else {
                            toast.error("Can't decrease quantity below 1");
                            return prev;
                          }
                        });
                      }}
                    >
                      <MinusCircleIcon className="size-5" />
                    </Button>
                    <p>{quantity.value}</p>
                    <Button
                      size="icon"
                      className="hover:text-primary"
                      variant="ghost"
                      onClick={() => {
                        setQuantity((prev) => ({
                          id: prev.id,
                          value: prev.value + 1,
                        }));
                      }}
                    >
                      <PlusCircleIcon className="size-5" />
                    </Button>
                  </div>
                ) : (
                  <p className="text-custom-gray-100 text-base">
                    Qty {LocalRenderQuantity(item.id, item.quantity)}
                  </p>
                )}
              </div>
              <div className="text-center">
                <p className="text-custom-dark-gray text-base font-medium">
                  {formatCurrency(
                    Number(item.unitPrice) *
                      LocalRenderQuantity(item.id, item.quantity)
                  )}
                </p>
              </div>
            </div>
            <div className="order-2 col-span-1 ml-2 flex items-center justify-center gap-2 md:order-3">
              {isEditing ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary h-fit w-fit rounded-full bg-slate-100 p-2"
                    onClick={() => {
                      handleUpdate(item);
                    }}
                  >
                    <CheckIcon className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-fit w-fit rounded-full bg-slate-100 p-2 text-red-500"
                    onClick={() => handleOnEditToggle(0, 0)}
                  >
                    <XIcon className="size-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary h-fit w-fit rounded-full bg-slate-100 p-2"
                    onClick={() => handleOnEditToggle(item.id, item.quantity)}
                  >
                    <Edit className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-fit w-fit rounded-full bg-slate-100 p-2 text-red-500"
                    onClick={() => handleOnDelete(item.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderInfo;
