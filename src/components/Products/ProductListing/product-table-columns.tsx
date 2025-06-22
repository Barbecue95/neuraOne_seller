import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2, ArrowUpDown } from "lucide-react";
import { ProductSortOption, type Product } from "@/types/product.types";
import { SortableHeader } from "./sortable-header";
import Link from "next/link";

export const ProductTableColumns = (
  onEditProduct?: (id: number) => void,
  onDeleteProduct?: (id: number) => void,
): ColumnDef<Product>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader
        title="Product"
        sortOptions={[
          { label: "Name (A → Z)", value: ProductSortOption.NAME_ASC },
          { label: "Name (Z → A)", value: ProductSortOption.NAME_DESC },
        ]}
      />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "category",
    accessorFn: (row) => row.mainCategory?.name ?? "-",
    header: ({ column }) => (
      <SortableHeader
        title="Category"
        sortOptions={[
          { label: "Category (A → Z)", value: ProductSortOption.CATEGORY_ASC },
          { label: "Category (Z → A)", value: ProductSortOption.CATEGORY_DESC },
        ]}
      />
    ),
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "sellingPrice",
    header: ({ column }) => (
      <SortableHeader
        title="Price"
        sortOptions={[
          {
            label: "Price (Low → High)",
            value: ProductSortOption.PRICE_LOW_HIGH,
          },
          {
            label: "Price (High → Low)",
            value: ProductSortOption.PRICE_HIGH_LOW,
          },
        ]}
      />
    ),
    cell: ({ row }) => <div>{row.getValue("sellingPrice")}</div>,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <SortableHeader
        title="Stock"
        sortOptions={[
          {
            label: "Quantity (Low → High)",
            value: ProductSortOption.QUANTITY_LOW_HIGH,
          },
          {
            label: "Quantity (High → Low)",
            value: ProductSortOption.QUANTITY_HIGH_LOW,
          },
        ]}
      />
    ),
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableHeader
        title="Status"
        sortOptions={[
          { label: "Status (A → Z)", value: ProductSortOption.STATUS_ASC },
          { label: "Status (Z → A)", value: ProductSortOption.STATUS_DESC },
        ]}
      />
    ),
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-2">
          <Link
            href={`/products/edit/${product.id}`}
            className="cursor-pointer"
            // onClick={() => onEditProduct?.(product.id)}
          >
            <Edit className="h-4 w-4" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteProduct?.(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

const SortableHeaderV1 = ({
  title,
  column,
}: {
  title: string;
  column: any;
}) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    className="h-auto p-0 font-medium"
  >
    {title}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);
