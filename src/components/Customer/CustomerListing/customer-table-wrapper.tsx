import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  Table as ReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { User } from "@/types/users.types";
import { cn } from "@/lib/utils";

interface Props {
  table: ReactTable<User>;
  columns: ColumnDef<User>[];
  loading: boolean;
}

const TableWrapper = ({ table, columns, loading }: Props) => {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="h-auto bg-[#EEEEEE] dark:bg-gray-700 py-4 text-lg text-[#3C3C3C] dark:text-white hover:bg-[#EEEEEE] dark:hover:bg-gray-800"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="overflow-hidden rounded-b-[20px]">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {columns.map((_, j) => (
                  <TableCell key={j}>
                    <div className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(
                  "cursor-pointer bg-white dark:bg-gray-800 text-lg font-normal text-[#303030] dark:text-white",
                  table.getRowModel().rows.length - 1 === index &&
                    "rounded-b-[20px]",
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
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
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
