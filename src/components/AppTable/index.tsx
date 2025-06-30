import React from "react";
import {
  ColumnDef,
  flexRender,
  Table as TanstackTable,
} from "@tanstack/react-table";

import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateUpdateBankPayload } from "@/types/bank.types";

type AppTableProps<TData extends object> = {
  table: TanstackTable<TData>;
  columns: ColumnDef<CreateUpdateBankPayload>[];
};

const AppTable = <TData extends object>({
  table,
  columns,
}: AppTableProps<TData>) => {
  return (
    <TableComponent>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup, index) => (
          <TableRow key={headerGroup.id + index}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </TableComponent>
  );
};

export default AppTable;
