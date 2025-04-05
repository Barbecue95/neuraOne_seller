"use client";

import { useState } from "react";
import {
  Pencil,
  DollarSign,
  NetworkIcon as Network2,
  Eye,
  Trash2,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NextButton from "./NextButton";

const PricingPage = () => {
  const [discountType, setDiscountType] = useState<"percentage" | "amount">(
    "percentage"
  );
  const [isProductTaxable, setIsProductTaxable] = useState(false);
  const [priceIncludesTax, setPriceIncludesTax] = useState(false);
  const [enableWholesale, setEnableWholesale] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [taxDropdownOpen, setTaxDropdownOpen] = useState(false);

  // TODO: This data will be API provided.
  const [wholesaleTiers, setWholesaleTiers] = useState([
    { minQuantity: "10", discount: "10 %", price: "10000 MMK" },
  ]);

  const addWholesaleTier = () => {
    setWholesaleTiers([
      ...wholesaleTiers,
      { minQuantity: "", discount: "", price: "" },
    ]);
  };

  const removeWholesaleTier = (index: number) => {
    setWholesaleTiers(wholesaleTiers.filter((_, i) => i !== index));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-16">
      
      <div className="space-y-3">
        {/* Basic Pricing */}
        <div className="bg-white p-4 h-fit rounded-xl">
          <h2 className="text-2xl font-bold mb-6 ">Basic Pricing</h2>

          <div className="mb-6">
            <label className="block text-gray-900 font-medium mb-2">
              Sale Price
            </label>
            <input
              type="text"
              defaultValue="10000 MMK"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-900 font-medium mb-2">
              Discount
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  defaultValue="10 %"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex rounded-lg overflow-hidden">
                <button
                  className={cn(
                    "px-4 py-2 transition-colors",
                    discountType === "percentage"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-200 text-gray-700"
                  )}
                  onClick={() => setDiscountType("percentage")}
                >
                  %
                </button>
                <button
                  className={cn(
                    "px-4 py-2 transition-colors",
                    discountType === "amount"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-200 text-gray-700"
                  )}
                  onClick={() => setDiscountType("amount")}
                >
                  $
                </button>
              </div>

              <div className="relative flex-1">
                <button
                  className="w-full flex items-center justify-between border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="text-gray-500">Select a discount type</span>
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <div className="p-2 hover:bg-gray-100 cursor-pointer">
                      Fixed Amount
                    </div>
                    <div className="p-2 hover:bg-gray-100 cursor-pointer">
                      Percentage
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tax Section */}
        <div className="bg-white p-4 h-fit rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Tax</h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 font-medium">
                  Is the product Taxable?
                </p>
                <p className="text-gray-500 text-sm">
                  Enable this option if the product is subject to tax during
                  checkout
                </p>
              </div>
              <div
                className={cn(
                  "w-12 h-6 rounded-full p-1 transition-colors cursor-pointer",
                  isProductTaxable ? "bg-blue-500" : "bg-gray-300"
                )}
                onClick={() => setIsProductTaxable(!isProductTaxable)}
              >
                <div
                  className={cn(
                    "bg-white w-4 h-4 rounded-full transform transition-transform",
                    isProductTaxable ? "translate-x-6" : ""
                  )}
                />
              </div>
            </div>

            {isProductTaxable && (
              <>
                <div>
                  <label className="block text-gray-900 font-medium mb-2">
                    Tax Category
                  </label>
                  <div className="relative">
                    <button
                      className="w-full flex items-center justify-between border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => setTaxDropdownOpen(!taxDropdownOpen)}
                    >
                      <span className="text-gray-500">Select a tax type</span>
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {taxDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <div className="p-2 hover:bg-gray-100 cursor-pointer">
                          Standard Rate
                        </div>
                        <div className="p-2 hover:bg-gray-100 cursor-pointer">
                          Reduced Rate
                        </div>
                        <div className="p-2 hover:bg-gray-100 cursor-pointer">
                          Zero Rate
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-900 font-medium mb-2">
                    Tax Rate (%)
                  </label>
                  <input
                    type="text"
                    defaultValue="0.5%"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-900 font-medium">
                    Price Includes Tax?
                  </p>
                  <div
                    className={cn(
                      "w-12 h-6 rounded-full p-1 transition-colors cursor-pointer",
                      priceIncludesTax ? "bg-blue-500" : "bg-gray-300"
                    )}
                    onClick={() => setPriceIncludesTax(!priceIncludesTax)}
                  >
                    <div
                      className={cn(
                        "bg-white w-4 h-4 rounded-full transform transition-transform",
                        priceIncludesTax ? "translate-x-6" : ""
                      )}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Wholesale Pricing */}
      <div className="bg-white p-4 h-fit rounded-xl">
        <h2 className="text-2xl font-bold mb-6">Wholesale Pricing</h2>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 font-medium">
                Enable Wholesale Pricing
              </p>
              <p className="text-gray-500 text-sm">
                Turn on to offer discounted pricing for bulk purchases.
              </p>
            </div>
            <div
              className={cn(
                "w-12 h-6 rounded-full p-1 transition-colors cursor-pointer",
                enableWholesale ? "bg-blue-500" : "bg-gray-300"
              )}
              onClick={() => setEnableWholesale(!enableWholesale)}
            >
              <div
                className={cn(
                  "bg-white w-4 h-4 rounded-full transform transition-transform",
                  enableWholesale ? "translate-x-6" : ""
                )}
              />
            </div>
          </div>
        </div>

        {enableWholesale && (
          <div>
            <p className="text-gray-900 font-medium mb-2">
              Wholesale Pricing Tiers
            </p>

            <div className="mb-2 grid grid-cols-2 gap-4 bg-[#E2E3E3] p-3.5 rounded-xl">
              <div className="text-gray-500 text-sm px-3">Minimum Quantity</div>
              <div className="text-gray-500 text-sm px-3">Price Per Unit</div>
            </div>

            <div className="bg-[#E2E3E3] p-3.5 rounded-xl">
              {wholesaleTiers.map((tier, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div className="grid grid-cols-3 gap-4 flex-1">
                    <input
                      type="text"
                      value={tier.minQuantity}
                      className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => {
                        const newTiers = [...wholesaleTiers];
                        newTiers[index].minQuantity = e.target.value;
                        setWholesaleTiers(newTiers);
                      }}
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={tier.discount}
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
                        onChange={(e) => {
                          const newTiers = [...wholesaleTiers];
                          newTiers[index].discount = e.target.value;
                          setWholesaleTiers(newTiers);
                        }}
                      />
                      <span className="text-gray-500">=</span>
                      <input
                        type="text"
                        value={tier.price}
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                        onChange={(e) => {
                          const newTiers = [...wholesaleTiers];
                          newTiers[index].price = e.target.value;
                          setWholesaleTiers(newTiers);
                        }}
                      />
                      <button
                        className="ml-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        onClick={() => removeWholesaleTier(index)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="mt-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={addWholesaleTier}
            >
              <Plus className="w-4 h-4" />
              Add row
            </button>
          </div>
        )}
      </div>

      <NextButton nextStep="variants" />
    </div>
  );
};

export default PricingPage;
