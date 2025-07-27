import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import OrderStatusBadge, { OrderStatus } from "./order-status-badge";

const OrderInfo = () => {
  return (
    <div className="bg-card rounded-md">
      {/* Order Info */}
      <div className="flex items-start justify-between p-5">
        <div>
          <h2 className="text-custom-dark-gray mb-1 text-xl font-medium">
            Order ID - 0031
          </h2>
          <p className="text-custom-gray-100 text-sm">
            ordered time 15 Jun 2024 at 11:10 AM
          </p>
        </div>
        <OrderStatusBadge status={OrderStatus.PENDING} />
      </div>

      {/* Ordered Items */}
      <div className="border-t p-5">
        <h3 className="text-custom-dark-gray text-base font-medium">
          Ordered Items
        </h3>

        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-3 gap-4 rounded-lg border-b py-3 md:grid-cols-6"
          >
            <div className="col-span-2 flex items-center justify-between gap-3 md:order-1">
              <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-white dark:bg-neutral-800">
                <Image
                  src="/images/file.svg?height=100&width=100&text=👟"
                  alt="Nike Air"
                  width={100}
                  height={100}
                  className="rounded"
                />
              </div>
              <div className="flex h-full w-full flex-col justify-between">
                <h4 className="text-custom-gray-100 text-xl font-medium">
                  Nike Air
                </h4>
                <p className="text-custom-gray-100 text-base font-normal">
                  Color : Black
                </p>
                <p className="text-custom-gray-100 text-base font-normal">
                  Size : 40
                </p>
              </div>
            </div>
            <div className="order-3 col-span-3 flex items-center justify-between md:order-2">
              <div className="w-10 md:hidden"></div>
              <div className="text-center">
                <p className="text-custom-dark-gray text-base font-medium">
                  250,000 Ks
                </p>
              </div>
              <div className="text-center">
                <p className="text-custom-gray-100 text-base">Qty 2</p>
              </div>
              <div className="text-center">
                <p className="text-custom-dark-gray text-base font-medium">
                  500,000 Ks
                </p>
              </div>
            </div>
            <div className="order-2 col-span-1 ml-2 flex items-center justify-center gap-1 md:order-3">
              <button className="h-fit w-fit rounded-full bg-purple-200 p-2 text-purple-600">
                <Edit className="h-4 w-4" />
              </button>
              <button className="h-fit w-fit rounded-full bg-red-200 p-2 text-red-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderInfo;
