"use client";

import DataTable from "@/components/table/DataTable";
import TablePagination from "@/components/table/TablePagination";
import { useReactTable } from "@tanstack/react-table";
import Image from "next/image";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
} from "@tanstack/table-core";
import { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from "react-bootstrap";
import { getVisaStage, type VisaCase, visaCases } from "./data";

const columnHelper = createColumnHelper<VisaCase>();
const stageClass: Record<ReturnType<typeof getVisaStage>, string> = {
  Deployed: "success",
  "Visa / travel": "primary",
  "In progress": "info",
  "Needs attention": "warning",
};

const columns = [
  columnHelper.accessor("id", {
    header: "Case ID",
    cell: ({ getValue }) => <span className="text-muted">{getValue()}</span>,
  }),
  columnHelper.accessor("applicantName", {
    header: "Applicant",
    cell: ({ row }) => (
      <div className="d-flex align-items-center">
        <Image
          src={row.original.avatar}
          className="avatar-sm rounded-circle me-2"
          alt={`${row.original.applicantName} avatar`}
        />
        <div>
          <span className="fw-semibold">{row.original.applicantName}</span>
          <span className="d-block text-muted fs-xs">
            {row.original.program}
          </span>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("trade", {
    header: "Occupation",
  }),
  columnHelper.accessor("referral", {
    header: "Referral Partner",
  }),
  columnHelper.accessor("salary", {
    header: "Salary",
    cell: ({ getValue }) => getValue() || "—",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue();
      return (
        <span
          className={`badge bg-${stageClass[getVisaStage(status)]}-subtle text-${stageClass[getVisaStage(status)]}`}
        >
          {status}
        </span>
      );
    },
  }),
];

const VisaCaseRegister = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 });

  const table = useReactTable({
    data: visaCases,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalItems = table.getPrePaginationRowModel().rows.length;
  const start = totalItems === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min(start + pageSize - 1, totalItems);

  return (
    <Card id="visa-case-register" className="h-100 mb-0">
      <CardHeader className="border-dashed">
        <CardTitle as="h4" className="mb-0">
          Visa Case Register
        </CardTitle>
        <p className="text-muted fs-xs mb-0 mt-1">
          Applicant records and processing statuses from the supplied workbook.
        </p>
      </CardHeader>
      <CardBody className="p-0">
        <DataTable<VisaCase>
          table={table}
          emptyMessage="No visa applications found."
          className="table-centered table-hover"
        />
      </CardBody>
      <CardFooter className="border-0">
        <TablePagination
          totalItems={totalItems}
          start={start}
          end={end}
          itemsName="applicants"
          showInfo
          previousPage={table.previousPage}
          canPreviousPage={table.getCanPreviousPage()}
          pageCount={table.getPageCount()}
          pageIndex={pageIndex}
          setPageIndex={table.setPageIndex}
          nextPage={table.nextPage}
          canNextPage={table.getCanNextPage()}
        />
      </CardFooter>
    </Card>
  );
};

export default VisaCaseRegister;
