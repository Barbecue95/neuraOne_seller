import AddNewProduct from "@/components/products/addProduct/AddNewProduct";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="w-full">
      <AddNewProduct />
      <div className="sticky bottom-0 left-0 bg-white shadow-xl w-full h-auto py-3 flex justify-end p-4 gap-3">
        <button className="border border-blue-600 w-24 h-9 text-blue-600">Cancel</button>
        <button className="bg-blue-600 w-24 h-9 text-white">Next</button>
      </div>
    </div>
  );
};

export default Page;
