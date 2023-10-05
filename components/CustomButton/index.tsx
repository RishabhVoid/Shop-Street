"use client";

import { CustomButtonType } from "@/types";

const CustomButton = ({
  title = "Default",
  disabled = false,
  styles = "",
  callback = () => {},
  type = "button",
  icon: Icon,
}: CustomButtonType) => {
  return (
    <button
      onClick={callback}
      disabled={disabled}
      type={type}
      className={`${
        disabled ? "bg-gray-500" : "bg-accent"
      } text-white py-1 px-4 rounded-[5px] transition duration-200 hover:brightness-110 ${styles}`}
    >
      <h1 className="mr-2">{title}</h1>
      {Icon && <img src={`/icons/${Icon}.png`} alt="Icon" />}
    </button>
  );
};

export default CustomButton;
