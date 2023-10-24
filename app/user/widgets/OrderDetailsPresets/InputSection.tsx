interface Props {
  value: string;
  setValue: (value: string) => void;
  label: string;
  placeholder: string;
  type: "number" | "text" | "email";
}

const InputSection = ({ value, setValue, label, placeholder, type }: Props) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="text-xl mb-2">
        {label}
      </label>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        id={label}
        type={type}
        className="py-4 px-2 outline-none bg-slate-200 w-[300px] rounded-[5px]"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputSection;
