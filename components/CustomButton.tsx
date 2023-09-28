"use client";

import { CustomButtonType } from "@/types";

const CustomButton = ({
  title = "Default",
  disabled = false,
  styles = "",
  callback = () => {},
  type = "button",
}: CustomButtonType) => {
  return (
    <button
      onClick={callback}
      disabled={disabled}
      type={type}
      className={`${
        disabled ? "bg-gray-500" : "bg-accent"
      } text-white py-2 px-4 rounded-[5px] transition duration-200 hover:brightness-110 ${styles}`}
    >
      {title}
    </button>
  );
};

export default CustomButton;
