import React, { FC, ReactNode } from "react"
import Spinner from "./spinner"

interface CustomButtonProps {
  isPending?: boolean
  className?: string
  disabled?: boolean
  onClick?: (e?: any) => void
  text?: string
  children?: ReactNode
}

const CustomButton: FC<CustomButtonProps> = ({
  isPending = false,
  className,
  disabled = false,
  onClick,
  text,
  children,
}) => {
  const handleClick = () => {
    onClick?.()
  }

  const disabledStyles = disabled
    ? "cursor-not-allowed hover:bg-slate-600 bg-slate-600"
    : ""

  return (
    <button
      disabled={isPending || disabled}
      type="submit"
      onClick={handleClick}
      className={
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex align-middle justify-center" +
        className +
        disabledStyles
      }
    >
      {children}
      {isPending ? <Spinner /> : text}
    </button>
  )
}

export default CustomButton
