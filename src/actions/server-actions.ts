import { setCount } from "@/store/dispatchers/countSlice"
import { getCountOfItems, getTableData, putTableData, postNewItem } from "./api-methods"
import { setTableData } from "@/store/dispatchers/tableSlice"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { AnyAction, Dispatch } from "redux"

const handleGetTableData = async (router: AppRouterInstance, dispatch: Dispatch<AnyAction>, offset?: number) => {
    await getTableData(
      async (responseData) => {
        dispatch(setTableData(responseData))
      },
      (error) => {
        console.error("Login failed. Error:", error)
        return
      },
      offset
    )
    await getCountOfItems(
      async (responseData) => {
        // @ts-ignore
        dispatch(setCount(responseData?.count))
      },
      (error) => {
        console.error("Login failed. Error:", error)
        return
      }
  )
  router.refresh()
}

const handlePatchTableData = async (data: TableItem) => {
    await putTableData(
      data,
      async () => {},
      (error) => {
        console.error("Login failed. Error:", error)
      }
    )
}

const handleAddItem = async (data: NewItem) => {
    await postNewItem(
      data,
      async () => {
      },
      (error) => {
        console.error("Login failed. Error:", error)
      }
    )
}

const handleGetCount= async () => {
    await getCountOfItems(
        async (responseData: any) => {
            return responseData?.count
        },
        (error) => {
            console.error("Login failed. Error:", error)
            return 0
        }
    )
}
  
export {handleGetTableData, handlePatchTableData, handleAddItem, handleGetCount}