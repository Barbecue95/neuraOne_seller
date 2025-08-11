"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import OrderInfo from "@/components/Order/OrderDetail/order-info";
import OrderSummary from "@/components/Order/OrderDetail/order-summary";
import PaymentInfo from "@/components/Order/OrderDetail/payment-info";
import CustomerDetail from "@/components/Order/OrderDetail/customer-detail";
import ShippingAddress from "@/components/Order/OrderDetail/shipping-address";
import OrderHeader from "@/components/Order/OrderDetail/order-header";
import AcceptRejectModal from "@/components/Order/OrderDetail/accept-reject-modal";
import useOrderDetail from "@/features/orders/useOrderDetail";
import Loading from "@/components/common/Loading";
import { OrderStatus } from "@/components/Order/OrderDetail/order-status-badge";

const OrderDetails = () => {
  const {
    orderDetail,
    isOrderDetailLoading,
    isOrderUpdateLoading,
    handleOrderUpdate,
    handleAccept,
    handleReject,
  } = useOrderDetail();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState<"Accept" | "Reject">(
    "Accept"
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onAccept = () => {
    handleAccept();
    setIsModalOpen(false);
  };
  const onReject = () => {
    handleReject();
    setIsModalOpen(false);
  };

  if (!orderDetail || isOrderDetailLoading) return <Loading />;

  return (
    <div className="bg-background flex min-h-screen flex-col p-0">
      <OrderHeader order={orderDetail.data} />
      <div className="flex flex-col">
        <div className="flex-1 overflow-auto px-4">
          <div className="relative grid h-full grid-cols-1 gap-4 md:grid-cols-3">
            {/* Left 2/3 */}
            <div className="col-span-1 flex flex-col gap-4 md:col-span-2">
              <OrderInfo
                order={orderDetail.data}
                onUpdate={handleOrderUpdate}
                isOrderUpdating={isOrderUpdateLoading}
              />
              <OrderSummary order={orderDetail.data} />
              <PaymentInfo transaction={orderDetail.data.transaction} />
            </div>
            {/* Right 1/3 */}
            <div className="col-span-1 flex flex-col">
              <CustomerDetail customer={orderDetail.data.user} />
              <ShippingAddress order={orderDetail.data} />
              {/* order Notes is Moved into ShippingAddress component */}
            </div>
          </div>
        </div>
        {orderDetail.data.status === OrderStatus.PENDING ? (
          <div className=" bg-background sticky bottom-0 left-0 z-10 flex w-full justify-center gap-8 py-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsModalOpen(true);
                setModalVariant("Reject");
              }}
              className="border-input w-40 bg-red-200 text-red-500 hover:bg-red-200/90 hover:text-red-500"
            >
              Reject
            </Button>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setModalVariant("Accept");
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-40"
            >
              Accept
            </Button>
          </div>
        ) : (
          <div className="pb-5" />
        )}
      </div>
      <AcceptRejectModal
        isOpen={isModalOpen}
        onClick={modalVariant === "Accept" ? onAccept : onReject}
        onClose={handleCloseModal}
        variant={modalVariant}
      />
    </div>
  );
};

export default OrderDetails;
