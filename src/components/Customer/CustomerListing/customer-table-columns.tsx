"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2, ArrowUpDown } from "lucide-react";
import { User, UserSortOption } from "@/types/users.types";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useDeleteUser } from "@/queries/users.queries";

export const CustomerTableColumns = (
  handleSortChange: (value: UserSortOption) => void,
  sortOptions: {
    label: string;
    value: UserSortOption;
  }[],
): ColumnDef<User>[] => {
  const router = useRouter();
  const { mutate: deleteUser } = useDeleteUser();
  const onEditProduct = (id: number) => {
    router.push(`/customers/${id}`);
  };

  const onDeleteProduct = (id: number) => {
    deleteUser(id.toString());
  };
  return [
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
      header: () => (
        <SortableHeader
          title="Customer"
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
      header: () => (
        <SortableHeader
          title="Phone Number"
          sortName="phone"
          sortOptions={sortOptions}
          handleSortChange={handleSortChange}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    },
    {
      accessorKey: "email",
      header: () => (
        <SortableHeader
          title="Email"
          sortName="email"
          sortOptions={sortOptions}
          handleSortChange={handleSortChange}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "totalOrderCount",
      header: () => (
        <SortableHeader
          title="Total Orders"
          sortName="order"
          sortOptions={sortOptions}
          handleSortChange={handleSortChange}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("totalOrderCount")}</div>,
    },
    {
      accessorKey: "totalOrderAmount",
      header: () => (
        <SortableHeader
          title="Total Spend"
          sortName="spend"
          sortOptions={sortOptions}
          handleSortChange={handleSortChange}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("totalOrderAmount")}</div>,
    },
    {
      accessorKey: "status",
      header: () => (
        <SortableHeader
          title="Status"
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
              onClick={() => onEditProduct(product.id)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onDeleteProduct(product.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
};

const SortableHeader = ({
  title,
  sortName,
  sortOptions,
  handleSortChange,
}: {
  title: string;
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
        className="h-auto cursor-pointer p-0 font-medium"
      >
        {title}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
      {show && (
        <div className="absolute top-5 flex translate-x-1/2 flex-col rounded-[10px] bg-gray-200 shadow">
          {options.map((option, index) => (
            <p
              className={cn(
                "cursor-pointer p-2",
                (index + 1) % 2 !== 0 && "border-b border-amber-50",
              )}
              key={index}
              onClick={() => sortChange(option)}
            >
              {option.label}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
