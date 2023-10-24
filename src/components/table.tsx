"use client"

import React, { FC, ReactNode, memo, useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import { useTable, useSortBy, Cell, usePagination } from "react-table"
import { handleGetTableData, handlePatchTableData } from "@/actions"
import CellItem from "./cell-item"
import { v4 as uuid } from "uuid"
import { ChevronsDown, ChevronsUp, ChevronsUpDown } from "lucide-react"
import { columns, data } from "@/constants"
import { setTableData } from "@/store/dispatchers/tableSlice"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

interface TableProps {
  children?: ReactNode
  className?: string
  pages: number
  setPages: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
  router: AppRouterInstance
  pageSize: number
  tableData: any
  count: any
}

const Table: FC<TableProps> = ({
  children,
  className,
  pages,
  setPages,
  currentPage,
  router,
  pageSize,
  tableData,
  count,
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const pagesN = Math.ceil(count / pageSize)
    setPages(pagesN)
  }, [count])

  const results: UserData[] | [] = useMemo(() => {
    return tableData.results
  }, [JSON.stringify(tableData.results)])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        // @ts-ignore
        columns: columns,
        data: results || data,
      },
      useSortBy,
      usePagination
    )

  const handleEdit = (cell: Cell<any>, newValue: string) => {
    if (cell.row.values[cell.column.id] !== newValue) {
      cell.row.values[cell.column.id] = newValue
      const updatedData = JSON.parse(JSON.stringify(tableData))

      const indexToUpdate = updatedData.results.findIndex(
        (item: { id: number }) => item.id === cell?.row?.values?.id
      )
      updatedData.results[indexToUpdate][cell.column.id] = newValue
      dispatch(setTableData(updatedData))

      // @ts-ignore
      handlePatchTableData(cell.row.values)
    }
  }

  const refreshData = async () => {
    await handleGetTableData(router, dispatch, currentPage * pageSize)
  }

  useEffect(() => {
    if (currentPage <= pages && currentPage >= 0) {
      refreshData()
    }
  }, [currentPage, pages])

  return (
    <>
      <div
        className={`overflow-x-auto h-[calc(100vh-120px)] w-full flex flex-col`}
      >
        <table
          {...getTableProps()}
          className={`table w-full border-collapse border border-gray-300 bg-gray-100 text-black ${className}`}
        >
          <thead className="bg-gray-100">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={uuid()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(
                      // @ts-ignore
                      column.getSortByToggleProps()
                    )}
                    className="p-3 text-center font-semibold hover:bg-slate-300"
                  >
                    <div className=" flex justify-center align-middle">
                      {column.render("Header")}
                      <span className="ml-1">
                        {
                          // @ts-ignore
                          column.isSorted ? (
                            // @ts-ignore
                            column.isSortedDesc ? (
                              <ChevronsDown />
                            ) : (
                              <ChevronsUp />
                            )
                          ) : (
                            <ChevronsUpDown />
                          )
                        }
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} key={uuid()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={uuid()}
                        className="border text-center align-middle"
                      >
                        <CellItem
                          onEdit={(newValue) => handleEdit(cell, newValue)}
                          cell={cell}
                        />
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        {children}
      </div>
    </>
  )
}

export default memo(Table)
