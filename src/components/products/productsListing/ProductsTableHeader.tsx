import React from "react";
import IconSorting from "../../icons/IconSorting";

type Props = {
  selectedItems: number[];
  displayProductLength: number;
  toggleSelectAll: () => void;
};

const ProductsTableHeader = ({
  selectedItems,
  displayProductLength,
  toggleSelectAll,
}: Props) => {
  return (
    <tr className="text-left text-gray-500 border-b bg-[#F1F1F1] table-auto" >
      <th className="p-4">
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-gray-300"
          checked={selectedItems.length === displayProductLength}
          onChange={toggleSelectAll}
        />
      </th>
      <th className="p-4 w-72">Product</th>
      <th className="p-4">
        <div className="flex items-center gap-1">
          Category
          <IconSorting />
        </div>
      </th>
      <th className="p-4 w-40">
        <div className="flex items-center justify-center gap-1">
          Price
          <IconSorting />
        </div>
      </th>
      <th className="p-4">
        <div className="flex items-center gap-1">
          Quantity
          <IconSorting />
        </div>
      </th>
      <th className="p-4">
        <div className="flex items-center gap-1">
          Status
          <IconSorting />
        </div>
      </th>
      <th className="p-4">
        <div className="flex items-center gap-1">
          Last Modified
          <IconSorting />
        </div>
      </th>
      <th className="p-4">Action</th>
    </tr>
  );
};

export default ProductsTableHeader;
