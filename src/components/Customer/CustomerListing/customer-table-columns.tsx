"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2, ArrowUpDown } from "lucide-react";
import type { Product } from "@/types/product.types";
import { User, UserSortOption } from "@/types/users.types";
import { useState } from "react";

export const CustomerTableColumns = (
  onEditProduct?: (id: number) => void,
  onDeleteProduct?: (id: number) => void,
  handleSortChange: (value: UserSortOption) => void,
  sortOptions: {
    label: string;
    value: UserSortOption;
  }[],
): ColumnDef<User>[] => [
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
        title="Customer"
        column={column}
        sortName="name"
        sortOptions={sortOptions}
        handleSortChange={handleSortChange}
      />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <SortableHeader
        title="Phone Number"
        column={column}
        sortName="phone"
        sortOptions={sortOptions}
        handleSortChange={handleSortChange}
      />
    ),
    cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <SortableHeader
        title="Email"
        column={column}
        sortName="email"
        sortOptions={sortOptions}
        handleSortChange={handleSortChange}
      />
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "totalOrderCount",
    header: ({ column }) => (
      <SortableHeader
        title="Total Orders"
        column={column}
        sortName="order"
        sortOptions={sortOptions}
        handleSortChange={handleSortChange}
      />
    ),
    cell: ({ row }) => <div>{row.getValue("totalOrderCount")}</div>,
  },
  {
    accessorKey: "totalOrderAmount",
    header: ({ column }) => (
      <SortableHeader
        title="Total Spend"
        column={column}
        sortName="spend"
        sortOptions={sortOptions}
        handleSortChange={handleSortChange}
      />
    ),
    cell: ({ row }) => <div>{row.getValue("totalOrderAmount")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableHeader
        title="Status"
        column={column}
        sortName="testing"
        sortOptions={sortOptions}
        handleSortChange={handleSortChange}
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
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEditProduct?.(product.id)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onDeleteProduct?.(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

const SortableHeader = ({
  title,
  column,
  sortName,
  sortOptions,
  handleSortChange,
}: {
  title: string;
  column: any;
  sortName: string;
  handleSortChange: (value: UserSortOption) => void;
  sortOptions: {
    label: string;
    value: UserSortOption;
  }[];
}) => {
  const options = sortOptions.filter((sort) =>
    sort.label.toLowerCase().includes(sortName),
  );
  const [show, setShow] = useState<boolean>(false);
  const sortChange = (option: { label: string; value: UserSortOption }) => {
    handleSortChange(option.value);
    setShow(false);
  };
  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setShow(!show)}
        className="h-auto p-0 font-medium"
      >
        {title}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
      {show && (
        <div className="absolute flex flex-col bg-gray-300 p-3">
          {options.map((option, index) => (
            <p key={index} onClick={() => sortChange(option)}>
              {option.label}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
