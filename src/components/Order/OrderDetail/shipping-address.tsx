import { Edit, MapPin, Navigation } from "lucide-react";
import React from "react";

const ShippingAddress = () => {
  return (
    <div className="bg-card space-y-5 pb-5">
      <div className="flex items-center justify-between border-t px-5 pt-5">
        <h3 className="text-custom-dark-gray text-xl font-medium">
          Shipping address
        </h3>
        <button className="rounded-full bg-purple-200 p-2 text-purple-600 transition-all duration-300 hover:scale-105 active:scale-95">
          <Edit className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2.5">
        <div className="flex gap-3 px-5">
          <MapPin className="text-custom-dark-gray mt-0.5 h-5 w-5 flex-shrink-0" />
          <div className="text-custom-dark-gray space-y-1 text-sm">
            <p>Shwe Taung Street, Kamayut Township, Yangon</p>
            <p>NO 123 SHWE TAUNG STREET, BLDG-05</p>
          </div>
        </div>
        <div className="flex gap-3 px-5">
          <Navigation className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#3C3C3C] dark:text-gray-100" />
          <div className="space-y-1 text-sm text-[#3C3C3C] dark:text-gray-100">
            <p>New City Mart</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
