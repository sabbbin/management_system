import {
  useReactTable,
  type ColumnDef,
  type RowData,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import React, { JSX, useState } from "react";

interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

interface Iprops<T extends RowData> {
  columnFilters?: string;
  columns: ColumnDef<T>[];
  data?: T[];
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  totalCount: number;
}

export default function Table<T>({
  columnFilters,
  columns,
  data = [],
  setOffset,
  offset,
  limit,
  setLimit,
  totalCount,
}: Iprops<T>): JSX.Element {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
      globalFilter: columnFilters,
    },
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="max-h-[85vh] overflow-y-auto">
      <table className="w-full relative ">
        <thead className=" sticky top-0 w-full">
          {table.getHeaderGroups().map((headerGrp) => {
            return (
              <tr key={headerGrp.id} className="h-10">
                {headerGrp.headers.map((header) => {
                  return (
                    <th key={header.id} className="">
                      <p className=" font-medium">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </p>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>

        <tbody className="bg-white ">
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="h-10 ">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      width={cell.column.getSize()}
                      className=" text-center  "
                    >
                      {(/Actions$/.exec(cell.id) ?? cell.getValue()) ? (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )
                      ) : (
                        <p className="text-slate-600/50 !text-sm">N/A</p>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <footer className="flex justify-between items-center px-28 sticky bottom-0 bg-white  py-3">
        <p>
          Showing {offset + 1}-{Math.min(offset + limit, totalCount)} of
          {totalCount} Results
        </p>
        <div>
          <label htmlFor="row">Rows Per Page</label>
          <select
            onChange={(e) => {
              const newLimit = Number(e.target.value);
              setLimit(newLimit);
              setOffset(0);
              setPagination((prev) => ({
                ...prev,
                pageSize: newLimit,
              }));
            }}
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="flex">
          <button
            type="button"
            onClick={() => {
              setOffset(0);
            }}
            disabled={Math.floor(offset / limit) + 1 === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-inherit disabled:fill-white"
            >
              <path
                d="M17.7075 8.5375L13.8275 12.4175L17.7075 16.2975C18.0975 16.6875 18.0975 17.3175 17.7075 17.7075C17.3175 18.0975 16.6875 18.0975 16.2975 17.7075L11.7075 13.1175C11.3175 12.7275 11.3175 12.0975 11.7075 11.7075L16.2975 7.1175C16.6875 6.7275 17.3175 6.7275 17.7075 7.1175C18.0875 7.5075 18.0975 8.1475 17.7075 8.5375Z"
                fill="#757575"
              />
              <path
                d="M11.7075 8.5375L7.8275 12.4175L11.7075 16.2975C12.0975 16.6875 12.0975 17.3175 11.7075 17.7075C11.3175 18.0975 10.6875 18.0975 10.2975 17.7075L5.7075 13.1175C5.3175 12.7275 5.3175 12.0975 5.7075 11.7075L10.2975 7.1175C10.6875 6.7275 11.3175 6.7275 11.7075 7.1175C12.0875 7.5075 12.0975 8.1475 11.7075 8.5375Z"
                fill="#757575"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => {
              setOffset((prev) => prev - limit);
            }}
            disabled={Math.floor(offset / limit) + 1 === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M14.7099 15.88L10.8299 12L14.7099 8.11998C15.0999 7.72998 15.0999 7.09998 14.7099 6.70998C14.3199 6.31998 13.6899 6.31998 13.2999 6.70998L8.70994 11.3C8.31994 11.69 8.31994 12.32 8.70994 12.71L13.2999 17.3C13.6899 17.69 14.3199 17.69 14.7099 17.3C15.0899 16.91 15.0999 16.27 14.7099 15.88Z"
                fill="#757575"
              />
            </svg>
          </button>
          {/* context */}

          <div>
            Page <span>{Math.ceil((offset + 1) / limit)} </span> of{" "}
            {Math.ceil(totalCount / limit)}
          </div>
          <button
            type="button"
            onClick={() => {
              setOffset((prev) => prev + limit);
            }}
            disabled={
              Math.floor(offset / limit + 1) === Math.ceil(totalCount / limit)
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9.29 15.88L13.17 12L9.29 8.11998C8.9 7.72998 8.9 7.09998 9.29 6.70998C9.68 6.31998 10.31 6.31998 10.7 6.70998L15.29 11.3C15.68 11.69 15.68 12.32 15.29 12.71L10.7 17.3C10.31 17.69 9.68 17.69 9.29 17.3C8.91 16.91 8.9 16.27 9.29 15.88Z"
                fill="#757575"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => {
              // table.setPageIndex(table.getPageCount() - 1);
              setOffset((Math.ceil(totalCount / limit) - 1) * limit);
            }}
            //current ===totalpage
            disabled={
              Math.floor(offset / limit + 1) === Math.ceil(totalCount / limit)
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              ``
              <path
                d="M6.2925 15.4625L10.1725 11.5825L6.2925 7.7025C5.9025 7.3125 5.9025 6.6825 6.2925 6.2925C6.6825 5.9025 7.3125 5.9025 7.7025 6.2925L12.2925 10.8825C12.6825 11.2725 12.6825 11.9025 12.2925 12.2925L7.7025 16.8825C7.3125 17.2725 6.6825 17.2725 6.2925 16.8825C5.9125 16.4925 5.9025 15.8525 6.2925 15.4625Z"
                fill="#757575"
              />
              <path
                d="M12.2925 15.4625L16.1725 11.5825L12.2925 7.7025C11.9025 7.3125 11.9025 6.6825 12.2925 6.2925C12.6825 5.9025 13.3125 5.9025 13.7025 6.2925L18.2925 10.8825C18.6825 11.2725 18.6825 11.9025 18.2925 12.2925L13.7025 16.8825C13.3125 17.2725 12.6825 17.2725 12.2925 16.8825C11.9125 16.4925 11.9025 15.8525 12.2925 15.4625Z"
                fill="#757575"
              />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}
