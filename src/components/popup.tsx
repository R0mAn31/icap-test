import React, { FC, ReactNode, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { handleAddItem } from "@/actions"
import { validationSchema } from "@/actions/validator"

interface PopupProps {
  children: ReactNode
  validationSchema?: any
}

const Popup: FC<PopupProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    //@ts-ignore
    resolver: yupResolver(validationSchema),
  })

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const onSubmit = (data: NewItem) => {
    console.log(data)

    handleAddItem(data)
  }

  return (
    <div className="flex flex-col gap-4 relative">
      <div onClick={handleOpen}>{children}</div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleOpen}
          ></div>
          <form
            //@ts-ignore
            onSubmit={handleSubmit(onSubmit)}
            className="relative flex flex-col gap-2 justify-center left-0 top-0 align-middle border bg-slate-400 p-4 rounded-lg"
          >
            <div className="flex flex-row gap-2 justify-between">
              <label>Name</label>
              <div className="flex align-middle justify-between gap-12">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => <input {...field} />}
                />
                {errors?.name && (
                  //@ts-ignore
                  <span className="text-red-500">{errors?.name?.message}</span>
                )}
              </div>
            </div>
            <div className="flex align-middle justify-between gap-12">
              <label>Email</label>
              <div className="flex align-middle justify-evenly">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <input {...field} />}
                />
                {errors?.email && (
                  //@ts-ignore
                  <span className="text-red-500">{errors?.email?.message}</span>
                )}
              </div>
            </div>
            <div className="flex align-middle justify-between gap-12">
              <label>Birthday Date</label>
              <div className="flex align-middle justify-evenly">
                <Controller
                  name="birthday_date"
                  control={control}
                  render={({ field }) => <input {...field} />}
                />
                {errors?.birthday_date && (
                  //@ts-ignore
                  <span className="text-red-500">
                    {errors?.birthday_date?.message?.toString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex align-middle justify-between gap-12">
              <label>Phone Number</label>
              <div className="flex align-middle justify-evenly">
                <Controller
                  name="phone_number"
                  control={control}
                  render={({ field }) => <input {...field} />}
                />
                {errors?.phone_number && (
                  <span className="text-red-500">
                    {errors?.phone_number?.message?.toString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex align-middle justify-between gap-12">
              <label>Address</label>
              <div className="flex align-middle justify-evenly">
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => <input {...field} />}
                />
                {errors?.address && (
                  <span className="text-red-500">
                    {errors?.address?.message?.toString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-4 justify-end">
              <button className="hover:bg-gray-200 p-2 rounded">Submit</button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleOpen()
                }}
                className="hover:bg-gray-200 p-2 rounded"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Popup
