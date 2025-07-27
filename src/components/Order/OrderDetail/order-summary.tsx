import React from "react";

const OrderSummary = () => {
  return (
    <div className="bg-card flex-1 space-y-5 rounded-md p-5">
      <h3 className="text-foreground text-xl font-medium">Order summary</h3>
      <div className="space-y-2.5 text-lg">
        <div className="flex justify-between">
          <span className="text-custom-dark-gray">Sub total</span>
          <span className="font-medium">500,000 Ks</span>
        </div>
        <div className="flex justify-between">
          <span className="text-custom-dark-gray">Shipping fee</span>
          <span className="font-medium">2,500 Ks</span>
        </div>
        <div className="flex justify-between">
          <span className="text-custom-dark-gray">Discount</span>
          <span className="font-medium">-20 %</span>
        </div>
      </div>
      <div className="border-t pt-5">
        <div className="flex justify-between">
          <span className="text-custom-dark-gray text-lg font-medium">
            Total
          </span>
          <span className="text-custom-dark-gray text-lg font-medium">
            402,500 Ks
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
