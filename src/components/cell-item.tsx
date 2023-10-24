import { validationSchema } from "@/actions/validator"
import { Pencil, X } from "lucide-react"
import React, { FC, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface CelltItemProps {
  onEdit?: (editedValue: string) => void
  cell: any
}

const CellItem: FC<CelltItemProps> = ({ onEdit, cell }) => {
  const columnName = cell.column.id
  const value = cell.value

  const dynamicSchema = yup.object().shape({
    [columnName]: validationSchema.fields[columnName],
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(dynamicSchema),
  })

  const [isEditing, setIsEditing] = useState<boolean>(false)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const onSubmit = (data: { [x: string]: string }) => {
    onEdit?.(data[columnName])
    setIsEditing(false)
    reset()
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex align-middle justify-center"
    >
      {isEditing ? (
        <div className="flex gap-3 justify-center items-center">
          <Controller
            name={columnName}
            control={control}
            defaultValue={value}
            render={({ field }) => <input {...field} />}
          />
          {errors[columnName]?.message && (
            <span className="text-red-500">{errors[columnName].message}</span>
          )}
          <button className="rounded border-blue-400 border-[1px] p-1 h-[28px] flex justify-center items-center">
            Save
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleCancelClick()
            }}
            className="rounded border-blue-400 border-[1px] flex flex-row gap-[2px] justify-center items-center p-1"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div className="flex gap-3 w-[160px] justify-center items-center">
          {cell.value}
          {columnName !== "id" && (
            <button
              onClick={(e) => {
                e.preventDefault()
                handleEditClick()
              }}
              className="rounded border-blue-400 border-[1px] flex flex-row gap-[2px] justify-center items-center p-1"
            >
              Edit
              <Pencil size={18} />
            </button>
          )}
        </div>
      )}
    </form>
  )
}

export default CellItem
