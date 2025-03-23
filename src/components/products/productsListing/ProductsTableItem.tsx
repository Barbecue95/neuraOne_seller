import { MoreVertical } from "lucide-react";
import React from "react";

export interface ProductTableItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  quantity: number;
  status: string;
  lastModified: string;
}
type Props = {
  product: ProductTableItem;
  selectedItems: number[];
  toggleSelectItem: (id: number) => void;
};

const ProductsTableItem = ({
  product,
  selectedItems,
  toggleSelectItem,
}: Props) => {
  return (
    <tr className="border-b hover:bg-gray-50 bg-white">
      <td className="p-4">
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-gray-300"
          checked={selectedItems.includes(product.id)}
          onChange={() => toggleSelectItem(product.id)}
        />
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded"></div>
          <div className="">
            <div className="font-medium">{product.name}</div>
            <div className="text-sm text-gray-500">{product.description}</div>
          </div>
        </div>
      </td>
      <td className="p-4">
        <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm">
          {product.category}
        </span>
      </td>
      <td className="p-4">{product.price}</td>
      <td className="p-4">{product.quantity}</td>
      <td className="p-4">{product.status}</td>
      <td className="p-4">{product.lastModified}</td>
      <td className="p-4">
        <button className="p-1 rounded-full hover:bg-gray-100">
          <MoreVertical size={20} />
        </button>
      </td>
    </tr>
  );
};

export default ProductsTableItem;
