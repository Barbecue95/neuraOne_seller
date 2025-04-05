"use client";

import { useState } from "react";
import {
  Pencil,
  DollarSign,
  NetworkIcon as Network2,
  Eye,
  Plus,
  Upload,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NextButton from "./NextButton";

const VariantsPage = () => {
  const [enableVariations, setEnableVariations] = useState(false);
  const [enableWeightDimension, setEnableWeightDimension] = useState(false);
  const [selectedPercentage, setSelectedPercentage] = useState("10 %");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pb-16">
      {/* Variants Section */}
      <div className={`${enableVariations ? "col-span-2" : "col-span-3"}`}>
        <div className="bg-white p-4 h-fit rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Variants</h2>

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 font-medium">Enable Variations</p>
                <p className="text-gray-500 text-sm">
                  Enable this option if the product has multiple variations
                </p>
              </div>
              <div
                className={cn(
                  "w-12 h-6 rounded-full p-1 transition-colors cursor-pointer",
                  enableVariations ? "bg-blue-500" : "bg-gray-300"
                )}
                onClick={() => setEnableVariations(!enableVariations)}
              >
                <div
                  className={cn(
                    "bg-white w-4 h-4 rounded-full transform transition-transform",
                    enableVariations ? "translate-x-6" : ""
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        {enableVariations && (
          <div className="bg-white p-4 h-fit rounded-xl mt-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Variant Combination</h3>
              <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                <Plus className="w-4 h-4" />
                Add Variant
              </button>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 flex items-center">
              <div className="w-1/4 font-medium">Percentage</div>
              <div className="flex gap-2">
                <button
                  className={cn(
                    "px-4 py-2 rounded-lg border",
                    selectedPercentage === "10 %"
                      ? "bg-white border-gray-300"
                      : "bg-gray-100 border-gray-200"
                  )}
                  onClick={() => setSelectedPercentage("10 %")}
                >
                  10 %
                </button>
                <button
                  className={cn(
                    "px-4 py-2 rounded-lg border",
                    selectedPercentage === "20 %"
                      ? "bg-white border-gray-300"
                      : "bg-gray-100 border-gray-200"
                  )}
                  onClick={() => setSelectedPercentage("20 %")}
                >
                  20 %
                </button>
              </div>
              <div className="ml-auto">
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Size Chart Section - Only visible when variations are enabled */}
      {enableVariations && (
        <div className="col-span-1 bg-white p-4 h-full rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Size Chart</h2>
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 flex flex-col items-center justify-center text-center">
            <div className="bg-blue-50 p-4 rounded-full mb-4">
              <Upload className="w-8 h-8 text-blue-500" />
            </div>
            <p className="mb-2">
              Drag your file(s) or{" "}
              <span className="text-blue-500 cursor-pointer">browse</span>
            </p>
            <p className="text-gray-500 text-sm">Max 10 MB files are allowed</p>
          </div>
        </div>
      )}

      {enableVariations && (
        <div className="col-span-3 ">
          <div className="mt-4 bg-white p-4 h-fit rounded-xl">
            <h3 className="text-xl font-bold mb-6">Variants Setting</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Price"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Stock"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="SKU"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                <Plus className="w-4 h-4" />
                Apply to all
              </button>
            </div>
          </div>

          <div className="mt-4 bg-white p-4 h-fit rounded-xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="mt-4 border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Variants
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                    <svg
                      className="w-4 h-4 inline-block ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Stock
                    <svg
                      className="w-4 h-4 inline-block ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    SKU
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-200 rounded"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          4GB / 32GB
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1000 MMK
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex items-center">
                <span className="text-sm text-gray-700">Showing</span>
                <select className="mx-2 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <span className="text-sm text-gray-700">of 50</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-md border border-gray-300 bg-white text-gray-500">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-md border border-gray-300 bg-blue-500 text-white">
                  1
                </button>
                <button className="p-2 rounded-md border border-gray-300 bg-white text-gray-700">
                  2
                </button>
                <button className="p-2 rounded-md border border-gray-300 bg-white text-gray-700">
                  3
                </button>
                <button className="p-2 rounded-md border border-gray-300 bg-white text-gray-700">
                  4
                </button>
                <button className="p-2 rounded-md border border-gray-300 bg-white text-gray-700">
                  5
                </button>
                <button className="p-2 rounded-md border border-gray-300 bg-white text-gray-500">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="col-span-3 bg-white p-4 h-fit rounded-xl">
        <h2 className="text-2xl font-bold mb-6">Weight</h2>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 font-medium">
                Different weight/dimension for variations
              </p>
              <p className="text-gray-500 text-sm">
                Enable this option if the product has multiple weight/dimension
              </p>
            </div>
            <div
              className={cn(
                "w-12 h-6 rounded-full p-1 transition-colors cursor-pointer",
                enableWeightDimension ? "bg-blue-500" : "bg-gray-300"
              )}
              onClick={() => setEnableWeightDimension(!enableWeightDimension)}
            >
              <div
                className={cn(
                  "bg-white w-4 h-4 rounded-full transform transition-transform",
                  enableWeightDimension ? "translate-x-6" : ""
                )}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-900 font-medium mb-2">Weight</label>
          <div className="flex">
            <input
              type="text"
              placeholder="Input"
              className="flex-1 border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg px-4 flex items-center text-gray-500">
              kg
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-900 font-medium mb-2">
            Parcel Size
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex">
              <div className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg px-4 flex items-center text-gray-500">
                W
              </div>
              <input
                type="text"
                className="flex-1 border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg px-4 flex items-center text-gray-500">
                cm
              </div>
            </div>

            <div className="flex">
              <div className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg px-4 flex items-center text-gray-500">
                L
              </div>
              <input
                type="text"
                className="flex-1 border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg px-4 flex items-center text-gray-500">
                cm
              </div>
            </div>

            <div className="flex">
              <div className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg px-4 flex items-center text-gray-500">
                H
              </div>
              <input
                type="text"
                className="flex-1 border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg px-4 flex items-center text-gray-500">
                cm
              </div>
            </div>
          </div>
        </div>
      </div>

      {enableWeightDimension && (
        <div className="col-span-3 bg-white p-4 h-fit rounded-xl">
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search"
              />
            </div>
          </div>

          {/* TODO: The table need to show dynamic data if the API is ready. Now it is static */}
          <div className="mt-4 border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Variants
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Weight
                    <svg
                      className="w-4 h-4 inline-block ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Width
                    <svg
                      className="w-4 h-4 inline-block ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Length
                    <svg
                      className="w-4 h-4 inline-block ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Height
                    <svg
                      className="w-4 h-4 inline-block ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-200 rounded"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          4GB / 32GB
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    10 kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex items-center">
                <span className="text-sm text-gray-700">Showing</span>
                <select className="mx-2 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <span className="text-sm text-gray-700">of 50</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-md border border-gray-300 bg-white text-gray-500">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-md border border-gray-300 bg-blue-500 text-white">
                  1
                </button>
                <button className="p-2 rounded-md border border-gray-300 bg-white text-gray-700">
                  2
                </button>
                <button className="p-2 rounded-md border border-gray-300 bg-white text-gray-700">
                  3
                </button>
                <button className="p-2 rounded-md border border-gray-300 bg-white text-gray-700">
                  4
                </button>
                <button className="p-2 rounded-md border border-gray-300 bg-white text-gray-700">
                  5
                </button>
                <button className="p-2 rounded-md border border-gray-300 bg-white text-gray-500">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <NextButton nextStep="finish" />
    </div>
  );
};

export default VariantsPage;
