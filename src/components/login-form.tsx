"use client"

import React, { useState } from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { executeLogIn, handleGetTableData } from "@/actions"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import CustomButton from "./custom-button"

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>()
  const router = useRouter()
  const dispatch = useDispatch()

  const [isPending, setIsPending] = useState<boolean>(false)

  const onSubmit: SubmitHandler<UserData> = async (data: UserData) => {
    setIsPending(false)
    executeLogIn(
      data,
      async (responseData) => {
        handleGetTableData(router, dispatch)
        router.push("/table")
      },
      (error) => {
        console.error("Login failed. Error:", error)
      }
    )
    setIsPending(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white shadow-md flex flex-col gap-5 rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            User name
          </label>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: "User name is required" }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
                    errors.username ? "border-red-500" : ""
                  }`}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs italic">
                    {errors.username.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <>
                <input
                  type="password"
                  {...field}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs italic">
                    {errors.password.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className="flex items-center justify-between">
          <CustomButton isPending={isPending} text="Login" />
        </div>
      </form>
    </div>
  )
}

export default LoginForm
