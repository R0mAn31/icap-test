"use client"

import { useRouter } from "next/navigation"
import React, { useEffect, useMemo, useState, useTransition } from "react"
import { useDispatch, useSelector } from "react-redux"
import { handleGetTableData } from "@/actions"
import Popup from "./popup"
import CustomButton from "./custom-button"
import GitLink from "./git-link"
import Table from "./table"

const TableWrapper = () => {
  const [pages, setPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const dispatch = useDispatch()
  const pageSize = 10

  // @ts-ignore
  const tableData = useSelector((store) => store.table)
  // @ts-ignore
  const count = useSelector((store) => store.count)

  const memoizedTable = useMemo(
    () => (
      <Table
        pages={pages}
        setPages={setPages}
        currentPage={currentPage}
        router={router}
        pageSize={pageSize}
        tableData={tableData}
        count={count}
        className={`${"animate-slide-in"}`}
        key={currentPage}
      />
    ),
    [tableData, currentPage]
  )

  useEffect(() => {
    const pagesN = Math.ceil(count / pageSize)
    setPages(pagesN)
  }, [count])

  const results: UserData[] | [] = useMemo(() => {
    return tableData.results
  }, [JSON.stringify(tableData.results)])

  const refreshData = async () => {
    startTransition(async () => {
      await handleGetTableData(router, dispatch, currentPage * pageSize)
    })
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
        <div className="h-[60px] flex items-center justify-center gap-2 bg-gray-100 text-black min-w-screen p-4 border-b-2">
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
          <div className="h-[calc(100vh-60px)] flex items-start justify-center bg-gray-100 p-[16px] pb-0 flex-col">
            {memoizedTable}
            <div className="text-black flex align-middle items-center justify-center w-[100%] h-[60px] gap-2 p-2 border-t-2">
              <CustomButton
                className="text-lg border border-gray-300 rounded"
                text="First"
                disabled={currentPage === 0 || isPending}
                onClick={() => setCurrentPage(0)}
              />
              <CustomButton
                className="text-lg border border-gray-300 rounded"
                text="Previous"
                disabled={currentPage === 0 || isPending}
                onClick={handlePrevPageClick}
              />
              <span className="text-lg w-[200px] text-center">
                Page {currentPage + 1} of {pages}
              </span>
              <CustomButton
                className="text-lg border border-gray-300 rounded"
                text="Next"
                onClick={handleNextPageClick}
                disabled={currentPage === pages - 1 || isPending}
              />
              <CustomButton
                className="text-lg border border-gray-300 rounded"
                text="Last"
                disabled={currentPage === pages - 1 || isPending}
                onClick={() => setCurrentPage(pages - 1)}
              />
            </div>
          </div>
        ) : (
          <div className="min-h-screen w-full text-center border border-gray-300 bg-gray-100 text-black">
            <span className="text-6xl font-bold">No info</span>
          </div>
        )}
        <GitLink />
      </div>
    </>
  )
}

export default TableWrapper
