"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import ProductsTableItem from "./ProductsTableItem";
import ProductsTableHeader from "./ProductsTableHeader";
import { productListingDummy } from "@/dummy/dummyData";
import { useRouter } from "next/navigation";

const ProductsTable = () => {
  const router = useRouter();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [displayItemCount, setDisplayItemCount] = useState<number>(10);

  // TODO: This will be the API call later;
  const data = productListingDummy;
  const products = data.products.slice(0, displayItemCount);
  const pagination = data.pagination;

  const [currentPage, setCurrentPage] = useState<number>(
    pagination.currentPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === products.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(products.map((_, index) => index));
    }
  };

  const toggleSelectItem = (index: number) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  return (
    <div className=" w-full px-4 ml-0 border shadow-md rounded-lg">
      <div className="flex justify-between items-center p-4 bg-white rounded-t-lg">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search size={20} />
          </div>
          <input
            type="search"
            className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search"
          />
        </div>
        <button
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => router.push("/products/add")}
        >
          <Plus size={20} />
          <span>New Product</span>
        </button>
      </div>

      <div className="overflow-x-auto ">
        <table className="w-full border-collapse">
          <thead>
            <ProductsTableHeader
              selectedItems={selectedItems}
              displayProductLength={products.length}
              toggleSelectAll={toggleSelectAll}
            />
          </thead>
          <tbody>
            {products.map((product, index) => (
              <ProductsTableItem
                key={index}
                product={product}
                selectedItems={selectedItems}
                toggleSelectItem={toggleSelectItem}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-4 bg-white rounded-b-lg">
        <div className="text-sm text-gray-500">
          Showing
          <select
            className="mx-2 px-2 py-1 border rounded"
            value={displayItemCount}
            onChange={(e) => setDisplayItemCount(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
          of {pagination.totalItems}
        </div>

        <div className="flex items-center gap-1">
          {/* Previous Button */}
          <button
            className="p-2 rounded hover:bg-gray-100"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Page Buttons */}
          {Array.from({ length: pagination.totalPages }).map((_, index) => (
            <button
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            className="p-2 rounded hover:bg-gray-100"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.totalPages}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
