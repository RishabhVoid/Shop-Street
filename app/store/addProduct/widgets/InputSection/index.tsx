import { RefObject } from "react";

interface Props {
  inpRef: RefObject<HTMLInputElement>;
  label: string;
  specialString?: string;
  placeholder: string;
  typeNo?: boolean;
}

const InputSection = ({
  inpRef,
  label,
  specialString,
  placeholder,
  typeNo = false,
}: Props) => {
  return (
    <div className="w-full h-auto mb-4">
      <label
        htmlFor={label}
        className="text-slate-600 font-primary text-[1.1rem]"
      >
        {label}
      </label>
      <div className="flex items-center mt-2">
        {specialString && (
          <h2 className="text-[1.7rem] bg-[--primary-accent] text-white mr-2 px-2 rounded-[5px]">
            $
          </h2>
        )}
        <input
          type={typeNo ? "number" : "text"}
          id={label}
          ref={inpRef}
          className="shadow-sm w-full shadow-slate-600 flex-1 text-[1rem] p-2 rounded-[5px] outline-[--primary-accent]"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputSection;
