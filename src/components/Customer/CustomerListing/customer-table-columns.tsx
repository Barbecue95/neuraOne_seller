"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, ArrowUpDown, BanIcon } from "lucide-react";
import { User, UserSortOption } from "@/types/users.types";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useDeleteUser } from "@/queries/users.queries";
import { SortableHeader } from "./sortable-header";

export const CustomerTableColumns = (
  handleSortChange: (value: UserSortOption) => void,
  sortOptions: {
    label: string;
    value: UserSortOption;
  }[],
  handleBlockOpen: (user:User) => void
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
          className="text-[#303030]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="text-[#303030]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <SortableHeader
          title="ID"
          sortOptions={[
            { label: "Newest", value: UserSortOption.NEWEST },
            { label: "Oldest", value: UserSortOption.OLDEST },
          ]}
        />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <SortableHeader
          title="ID"
          sortOptions={[
            { label: "Newest", value: UserSortOption.NEWEST },
            { label: "Oldest", value: UserSortOption.OLDEST },
          ]}
        />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: () => (
        <SortableHeader
          title="Customer"
          sortOptions={[
            { label: "Name (A → Z)", value: UserSortOption.NAME_ASC },
            { label: "Name (Z → A)", value: UserSortOption.NAME_DESC },
          ]}
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
          sortOptions={[
            { label: "Phone (0 → 9)", value: UserSortOption.PHONE_ASC },
            { label: "Hhone (9 → 0)", value: UserSortOption.PHONE_DESC },
          ]}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    },
    {
      accessorKey: "email",
      header: () => (
        <SortableHeader
          title="Email"
          sortOptions={[
            { label: "Email (A → Z)", value: UserSortOption.EMAIL_ASC },
            { label: "Email (Z → A)", value: UserSortOption.EMAIL_DESC },
          ]}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "totalOrderCount",
      header: () => (
        <SortableHeader
          title="Total Orders"
          sortOptions={[
            {
              label: "Total (0 → 9)",
              value: UserSortOption.TOTAL_ORDER_COUNT_ASC,
            },
            {
              label: "Total (9 → 0)",
              value: UserSortOption.TOTAL_ORDER_COUNT_DESC,
            },
          ]}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("totalOrderCount")}</div>,
    },
    // {
    //   accessorKey: "totalOrderAmount",
    //   header: ({ column }) => (
    //     <SortableHeader
    //       title="Total Spend"
    //       sortOptions={[
    //         { label: "Total (0 → 9)", value: UserSortOption.TOTAL_ORDER_AMOUNT_ASC },
    //         { label: "Total (9 → 0)", value: UserSortOption.TOTAL_ORDER_AMOUNT_DESC },
    //       ]}
    //     />
    //   ),
    //   cell: ({ row }) => <div>{row.getValue("totalOrderAmount")}</div>,
    // },
    {
      accessorKey: "status",
      header: () => (
        <SortableHeader
          title="Status"
          sortOptions={[]}
        />
      ),
      cell: ({ getValue }) => {
        const status = getValue() as string;

        const color =
          {
            ACTIVE: "bg-green-100 text-green-800",
            INACTIVE: "bg-yellow-100 text-yellow-800",
            SUSPENDED: "bg-red-100 text-red-800",
          }[status] ?? "bg-gray-100 text-gray-800";

        return (
          <span
            className={`inline-block w-24 rounded-full px-3 py-1 text-center text-sm font-normal ${color}`}
          >
            {status == "ACTIVE" ? "Active" : "Blocked"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#F6F1F4] transition-all duration-300 hover:scale-105 hover:bg-[#EEEEEE]"
              onClick={() => onEditProduct(user.id)}
            >
              <Edit className="h-4 w-4 text-[#616FF5]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#F6F1F4] transition-all duration-300 hover:scale-105 hover:bg-[#EEEEEE]"
              onClick={() => handleBlockOpen(user)}
            >
              <BanIcon className="h-4 w-4 rotate-90 text-[#FF3333]" />
            </Button>
          </div>
        );
      },
    },
  ];
};

const SortableHeaderV1 = ({
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
