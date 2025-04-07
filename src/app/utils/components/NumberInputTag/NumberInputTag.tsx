import React from "react";
import styles from "./InputTag.module.css";
interface Props {
  name: string;
  label?: string;
  setter: (name: string, value: any) => void;
  placeHolder?: string;
  value: any;
  isDisabled?: boolean;
}

const NumberInputTag = ({
  name,
  label,
  setter,
  value,
  placeHolder,
  isDisabled,
}: Props) => {
  return (
    <div className={`${styles.inputGroup}`}>
      <label
        className="text-xs text-[#1E1E1E] mb-1 font-alata font-normal leading-4"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className={styles.input}
        id={name}
        type="number"
        name={name}
        disabled={isDisabled}
        value={value}
        placeholder={placeHolder}
        onChange={(e) => {
          setter(name, e.target.value);
        }}
      />
    </div>
  );
};

export default NumberInputTag;
