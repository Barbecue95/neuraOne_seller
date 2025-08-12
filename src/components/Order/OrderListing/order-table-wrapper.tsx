// src/components/OrderTable/TableWrapper.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { flexRender } from "@tanstack/react-table";
import type { Table as TanstackTable, ColumnDef } from "@tanstack/react-table";
import { Order } from "@/types/order.types";

interface Props {
  table: TanstackTable<Order>;
  loading: boolean;
  goToDetail: (orderId: number) => void;
}

const TableWrapper = ({ table, loading, goToDetail }: Props) => {
  const visibleCols = table.getVisibleLeafColumns();
  const colCount = visibleCols.length;

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow
              key={hg.id}
              className={cn(
                "h-auto bg-[#EEEEEE] py-4 text-lg text-[#3C3C3C] hover:bg-[#EEEEEE]",
                "dark:bg-gray-700 dark:text-white dark:hover:bg-gray-800"
              )}
            >
              {hg.headers.map((header) => (
                <TableHead key={header.id} className="px-4 py-2 text-left">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className="overflow-hidden rounded-b-[20px]">
          {loading ? (
            // skeleton rows
            Array.from({ length: 5 }).map((_, rowI) => (
              <TableRow key={rowI}>
                {Array.from({ length: colCount }).map((_, colI) => (
                  <TableCell key={colI} className="px-4 py-4">
                    <div
                      className="\ h-4 w-full animate-pulse rounded
bg-gray-200 dark:bg-gray-800"
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows.length > 0 ? (
            // actual data rows
            table.getRowModel().rows.map((row, rowI) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => goToDetail(row.original.id)}
                className={cn(
                  "cursor-pointer bg-white text-lg font-normal text-[#303030]",
                  "dark:bg-gray-800 dark:text-white",
                  rowI === table.getRowModel().rows.length - 1 &&
                    "rounded-b-[20px]"
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-4 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            // no-results row
            <TableRow>
              <TableCell colSpan={colCount} className="h-24 text-center">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableWrapper;
