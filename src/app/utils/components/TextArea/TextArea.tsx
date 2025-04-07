import React from "react";
import styles from "./TextArea.module.css";
interface Props {
  name: string;
  label?: string;
  setter: (name: string, value: any) => void;
  placeHolder?: string;
  range?: number;
  value: any;
  isRequired?: boolean;
}

const TextArea = ({
  name,
  label,
  setter,
  value,
  placeHolder,
  range,
  isRequired,
}: Props) => {
  return (
    <div className={`${styles.inputGroup} h-full`}>
      <label
        className="text-xs text-[#1E1E1E] mb-1 font-alata font-normal leading-4"
        htmlFor={name}
      >
        {label}
        {isRequired && <span className="text-red-900">*</span>}
      </label>
      <textarea
        className={`${styles.input} flex-1 max-h-52`}
        id={name}
        name={name}
        value={value}
        placeholder={placeHolder}
        onChange={(e) => {
          // if (e.target.value.length < (range ?? 255)) {
            setter(name, e.target.value);
          // } else {
          //   e.preventDefault();
          // }
        }}
      />
    </div>
  );
};

export default TextArea;
