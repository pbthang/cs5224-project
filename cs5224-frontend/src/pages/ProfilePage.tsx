import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { PortfolioArchiveEntry } from "./GenerateSuccessPage";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import {
  ArrowUpDown,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { useState } from "react";

const columns: ColumnDef<PortfolioArchiveEntry>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{moment(row.getValue("createdAt")).calendar()}</div>
    ),
  },
  {
    accessorKey: "url",
    header: "Portfolio URL",
    cell: ({ row }) => <div>{row.getValue("url")}</div>,
  },
  {
    id: "copy-link",
    cell: ({ row }) => {
      return (
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => {
            navigator.clipboard.writeText(row.getValue("url"));
          }}
        >
          <span className="sr-only">Copy Link</span>
          <CopyIcon className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "external-link",
    cell: ({ row }) => {
      return (
        <Button variant="ghost" className="h-8 w-8 p-0" asChild>
          <Link to={row.getValue("url")} target="_blank" rel="noreferrer">
            <span className="sr-only">External Link</span>
            <ExternalLinkIcon className="h-4 w-4" />
          </Link>
        </Button>
      );
    },
  },
];

function ProfilePage() {
  const { user } = useUser();
  const [portfolioArchive] = useLocalStorage<PortfolioArchiveEntry[]>(
    "portfolioArchive",
    []
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: portfolioArchive,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div>
      <Hero
        title="Profile"
        subtitle={`Hi, ${user?.firstName}. Welcome to your profile page!`}
      >
        <Button variant={"secondary"} asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </Hero>
      <div className="px-8 md:px-16 py-10">
        <h1 className="text-2xl font-bold text-center">
          Generated Portfolio Webpages
        </h1>
        <div className="rounded-md border max-w-4xl m-auto mt-6">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 max-w-4xl m-auto mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-4 w-4 mr-1" />
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
