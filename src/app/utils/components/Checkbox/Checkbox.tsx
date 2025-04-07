import React from "react";
interface Props {
  name: string;
  label?: string;
  setter: (name: string, value: any) => void;
  value: any;
  disabled?: boolean
}

const Checkbox = ({ name, label, setter, value, disabled }: Props) => {
  return (
    <div className="flex items-center">
      <input
        title="name"
        className="w-4 h-4 accent-[#1B6CB8] cursor-pointer"
        // id={name}
        type="checkbox"
        name={name}
        checked={value}
        value={value}
        disabled={disabled ?? false}
        onChange={(e) => {
          setter(name, !value);
        }}
      />
      <label
        className="text-xs text-[#1E1E1E] font-alata font-normal leading-4 ml-3"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
