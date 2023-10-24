import React, { FC } from "react"
import Spinner from "./spinner"

interface CustomButtonProps {
  isPending?: boolean
  className?: string
  disabled?: boolean
  onClick?: () => void
  text?: string
}

const CustomButton: FC<CustomButtonProps> = ({
  isPending = false,
  className,
  disabled = false,
  onClick,
  text,
}) => {
  const handleClick = () => {
    onClick?.()
  }

  return (
    <button
      disabled={isPending || disabled}
      type="submit"
      onClick={handleClick}
      className={
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex align-middle justify-center" +
        className
      }
    >
      {isPending ? <Spinner /> : text}
    </button>
  )
}

export default CustomButton
