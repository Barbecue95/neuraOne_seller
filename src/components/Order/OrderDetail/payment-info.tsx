"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import KPaySlip from "@/assets/order/kpay-slip.jpg";

const PaymentInfo = () => {
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  return (
    <div className="bg-card space-y-5 rounded-md p-5">
      <h3 className="text-foreground text-xl font-medium">Payment details</h3>

      <div className="space-y-2.5 text-lg">
        <div className="flex justify-between">
          <span className="text-custom-dark-gray">Name</span>
          <span className="font-medium">John Doe</span>
        </div>

        <div className="flex justify-between">
          <span className="text-custom-dark-gray">Payment method</span>
          <span className="font-medium">KBZPay</span>
        </div>

        <div className="flex justify-between">
          <span className="text-custom-dark-gray">Phone number</span>
          <span className="font-medium">09123456789</span>
        </div>

        <div className="flex items-start justify-between">
          <p className="text-custom-dark-gray">Screenshot</p>
          <div
            onClick={() => setOpenPaymentDialog(true)}
            className="bg-card flex cursor-pointer items-center justify-center rounded-2xl border"
          >
            <Image
              src={KPaySlip}
              alt="Payment screenshot"
              className="h-24 w-24 rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>

      <Dialog
        open={openPaymentDialog}
        onOpenChange={() => setOpenPaymentDialog(false)}
      >
        <DialogContent
          showCloseButton={false}
          className="gap-0 rounded-2xl border-0 bg-white p-0 shadow-xl dark:bg-gray-800 sm:max-w-md"
        >
          {/* Close button */}
          <button
            onClick={() => setOpenPaymentDialog(false)}
            className="dark:hover:gray-600 absolute right-4 top-4 z-10 cursor-pointer rounded-full bg-gray-800 p-1 transition-colors hover:bg-gray-600"
          >
            <X className="h-5 w-5 text-gray-100" />
          </button>

          <Image
            src={KPaySlip}
            alt="Payment screenshot"
            width={1000}
            height={1000}
            className="h-auto w-screen"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentInfo;
