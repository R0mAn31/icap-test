"use client"

import { useRouter } from "next/navigation"
import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTable, useSortBy, Cell, usePagination } from "react-table"
import { handleGetTableData, handlePatchTableData } from "@/actions"
import CellItem from "./cell-item"
import { v4 as uuid } from "uuid"
import { ChevronsDown, ChevronsUp, ChevronsUpDown } from "lucide-react"
import Popup from "./popup"
import { columns, data } from "@/constants"
import CustomButton from "./custom-button"

const Table = () => {
  const [pages, setPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const router = useRouter()
  const dispatch = useDispatch()
  const pageSize = 10

  // @ts-ignore
  const tableData = useSelector((store) => store.table)
  // @ts-ignore
  const count = useSelector((store) => store.count)

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
    cell.row.values[cell.column.id] = newValue
    // @ts-ignore
    handlePatchTableData(cell.row.values)
    refreshData()
  }

  const refreshData = async () => {
    await handleGetTableData(router, dispatch, currentPage * pageSize)
  }

  const handleNextPageClick = async () => {
    if (currentPage <= pages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPageClick = async () => {
    if (currentPage <= pages) {
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    if (currentPage <= pages && currentPage >= 0) {
      refreshData()
    }
  }, [currentPage, pages])

  return (
    <>
      <div className="min-h-screen flex flex-col ">
        <div className="h-[120px] flex items-center justify-center gap-2 bg-gray-100 text-black flex-col min-w-screen p-4">
          <CustomButton
            onClick={() => {
              setCurrentPage(0)
            }}
            className="border border-[blue] p-2 rounded"
            text="Get data"
          />
          <Popup>
            <CustomButton
              className="text-lg border border-gray-300 rounded px-2"
              text="Add new"
            />
          </Popup>
        </div>
        {results ? (
          <div className="h-[calc(100vh-120px)] flex items-start justify-center bg-gray-100 p-[16px] flex-col">
            <div className="overflow-x-auto h-[calc(100vh-120px)] w-full">
              <table
                {...getTableProps()}
                className="table w-full border-collapse border border-gray-300 bg-gray-100 text-black"
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
                          className="p-3 text-center font-semibold"
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
                                onEdit={(newValue) =>
                                  handleEdit(cell, newValue)
                                }
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
            </div>
            <div className="text-black flex align-middle items-center justify-center w-[100%] h-[100px] gap-2 p-2">
              <CustomButton
                className="text-lg border border-gray-300 rounded after:px-2"
                text="First"
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(0)}
              />
              <CustomButton
                className="text-lg border border-gray-300 rounded after:px-2"
                text="Previous"
                disabled={currentPage === 0}
                onClick={handlePrevPageClick}
              />
              <span className="text-lg">
                Page {currentPage + 1} of {pages}
              </span>
              <CustomButton
                className="text-lg border border-gray-300 rounded px-2"
                text="Next"
                onClick={handleNextPageClick}
                disabled={currentPage === pages - 1}
              />
              <CustomButton
                className="text-lg border border-gray-300 rounded after:px-2"
                text="Last"
                disabled={currentPage === pages}
                onClick={() => setCurrentPage(pages - 1)}
              />
            </div>
          </div>
        ) : (
          <div className="min-h-screen w-full text-center border border-gray-300 bg-gray-100 text-black">
            <span className="text-6xl font-bold">No info</span>
          </div>
        )}
      </div>
    </>
  )
}

export default Table
