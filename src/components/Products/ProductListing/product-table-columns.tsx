import { type ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Trash2, ArrowUpDown } from "lucide-react"
import type { Product } from "@/types/product.types"

export const ProductTableColumns = (
  onEditProduct?: (id: string) => void,
  onDeleteProduct?: (id: string) => void
): ColumnDef<Product>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
    header: "Product",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <SortableHeader title="Category" column={column} />
    ),
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <SortableHeader title="Stock" column={column} />
    ),
    cell: ({ row }) => <div>{row.getValue("stock")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableHeader title="Status" column={column} />
    ),
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEditProduct?.(product.id)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onDeleteProduct?.(product.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]

const SortableHeader = ({ title, column }: { title: string; column: any }) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    className="h-auto p-0 font-medium"
  >
    {title}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
)
