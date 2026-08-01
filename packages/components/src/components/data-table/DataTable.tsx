"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { cn } from "../../lib/utils";
import { Table } from "./Table";

export interface DataTableProps<TData> {
  className?: string;
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  enableSorting?: boolean;
  getRowId?: (originalRow: TData, index: number) => string;
}

function DataTable<TData>({
  className,
  columns,
  data,
  enableSorting = true,
  getRowId,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    onSortingChange: setSorting,
    getRowId,
    state: {
      sorting,
    },
  });

  return (
    <Table className={className}>
      <Table.Head>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const canSort = enableSorting && header.column.getCanSort();
              const sorted = header.column.getIsSorted();

              return (
                <Table.HeaderCell key={header.id}>
                  {header.isPlaceholder ? null : (
                    <button
                      type="button"
                      disabled={!canSort}
                      onClick={
                        canSort
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      className={cn(
                        "flex min-w-max items-center gap-1 text-left font-medium",
                        canSort &&
                          "cursor-pointer select-none hover:text-primary",
                        !canSort && "cursor-default"
                      )}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {sorted === "asc" ? (
                        <span aria-hidden className="text-label-small">
                          ↑
                        </span>
                      ) : null}
                      {sorted === "desc" ? (
                        <span aria-hidden className="text-label-small">
                          ↓
                        </span>
                      ) : null}
                    </button>
                  )}
                </Table.HeaderCell>
              );
            })}
          </Table.Row>
        ))}
      </Table.Head>
      <Table.Body>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

DataTable.displayName = "DataTable";

export { DataTable };
export type { ColumnDef, SortingState };
