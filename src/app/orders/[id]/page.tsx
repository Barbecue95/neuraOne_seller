"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import OrderInfo from "@/components/Order/OrderDetail/order-info";
import OrderSummary from "@/components/Order/OrderDetail/order-summary";
import PaymentInfo from "@/components/Order/OrderDetail/payment-info";
import CustomerDetail from "@/components/Order/OrderDetail/customer-detail";
import ShippingAddress from "@/components/Order/OrderDetail/shipping-address";
import OrderNote from "@/components/Order/OrderDetail/order-note";
import OrderHeader from "@/components/Order/OrderDetail/order-header";
import AcceptRejectModal from "@/components/Order/OrderDetail/accept-reject-modal";

const OrderDetails = () => {
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState<"Accept" | "Reject">(
    "Accept"
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleReject = () => {
    setIsModalOpen(true);
    setModalVariant("Reject");
    // TODO: Add Logic
  };

  const handleAccept = () => {
    setIsModalOpen(true);
    setModalVariant("Accept");
    // TODO: Add Logic
  };

  return (
    <div className="bg-background flex min-h-screen flex-col p-0">
      <OrderHeader />
      <div className="flex flex-col">
        <div className="flex-1 overflow-auto px-4">
          <div className="relative grid h-full grid-cols-1 gap-4 md:grid-cols-3">
            {/* Left 2/3 */}
            <div className="col-span-1 flex flex-col gap-4 md:col-span-2">
              <OrderInfo />
              <OrderSummary />
              <PaymentInfo />
            </div>
            {/* Right 1/3 */}
            <div className="col-span-1 flex flex-col">
              <CustomerDetail />
              <ShippingAddress />
              <OrderNote />
            </div>
          </div>
        </div>
        <div className=" bg-background sticky bottom-0 left-0 z-10 flex w-full justify-center gap-8 py-6">
          <Button
            variant="outline"
            onClick={handleReject}
            className="border-input w-40 bg-red-200 text-red-500 hover:bg-red-200/90 hover:text-red-500"
          >
            Reject
          </Button>
          <Button
            onClick={handleAccept}
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-40"
          >
            Accept
          </Button>
        </div>
      </div>
      <AcceptRejectModal
        isOpen={isModalOpen}
        onClick={modalVariant === "Accept" ? handleAccept : handleReject}
        onClose={handleCloseModal}
        variant={modalVariant}
      />
    </div>
  );
};

export default OrderDetails;
